import ListCharacterService from '@modules/characters/services/ListCharacterService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';
import DeleteCharacterService from '@modules/characters/services/DeleteCharacterService';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'graphql-tools';
import GraphQLUploadFileProvider from '@shared/container/providers/UploadFileProvider/implementations/GraphQLFileUploadProvider';
import UpdateCharacterCoverImageService from '@modules/characters/services/UpdateCharacterCoverImageService';
import UpdateCharacterBannerImageService from '@modules/characters/services/UpdateCharacterBannerImageService';
import {
  CreateCharacterInput,
  UpdateCharacterInput,
} from '../schemas/Character.schema';
import Character from '../../typeorm/entities/Character';

@Resolver(Character)
class CharactersResolver {
  @Query(() => Character, { nullable: true })
  async character(@Arg('id') id: string): Promise<Character | undefined> {
    const listCharacterService = container.resolve(ListCharacterService);

    const character = await listCharacterService.execute({ id });
    return classToClass(character);
  }

  @Mutation(() => Character)
  async createCharacter(
    @Arg('input') input: CreateCharacterInput,
  ): Promise<Character> {
    const { name, description, age } = input;

    const createCharacterService = container.resolve(CreateCharacterService);

    const character = await createCharacterService.execute({
      name,
      description,
      age,
    });

    return classToClass(character);
  }

  @Mutation(() => Character)
  async updateCharacter(
    @Arg('input') input: UpdateCharacterInput,
  ): Promise<Character> {
    const { id, name, description, age } = input;

    const updateCharacterService = container.resolve(UpdateCharacterService);

    const character = await updateCharacterService.execute({
      characterId: id,
      name,
      description,
      age,
    });

    return classToClass(character);
  }

  @Mutation(() => Character)
  async deleteCharacter(@Arg('id') id: string): Promise<Character> {
    const deleteCharacterService = container.resolve(DeleteCharacterService);

    const character = await deleteCharacterService.execute({ id });

    return classToClass(character);
  }

  @Mutation(() => Character)
  async updateCharacterCoverImage(
    @Arg('characterId') characterId: string,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
  ): Promise<Character> {
    const graphQLUploadFileProvider = new GraphQLUploadFileProvider();

    const { fileName } = await graphQLUploadFileProvider.uploadFile(file);

    const updateCharacterCoverImageService = container.resolve(
      UpdateCharacterCoverImageService,
    );

    const characterUpdated = await updateCharacterCoverImageService.execute({
      characterId,
      coverImageName: fileName,
    });

    return characterUpdated;
  }

  @Mutation(() => Character)
  async updateCharacterBannerImage(
    @Arg('characterId') characterId: string,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
  ): Promise<Character> {
    const graphQLUploadFileProvider = new GraphQLUploadFileProvider();

    const { fileName } = await graphQLUploadFileProvider.uploadFile(file);

    const updateCharacterBannerImageService = container.resolve(
      UpdateCharacterBannerImageService,
    );

    const characterUpdated = await updateCharacterBannerImageService.execute({
      characterId,
      bannerImageName: fileName,
    });

    return characterUpdated;
  }
}

export default CharactersResolver;
