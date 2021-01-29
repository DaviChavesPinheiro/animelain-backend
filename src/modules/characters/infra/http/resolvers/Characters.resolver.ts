import ListCharactersService from '@modules/characters/services/ListCharactersService';
import ListCharacterService from '@modules/characters/services/ListCharacterService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';
import DeleteCharacterService from '@modules/characters/services/DeleteCharacterService';
import Character from '../../typeorm/entities/Character';
import {
  CreateCharacterInput,
  UpdateCharacterInput,
} from '../schemas/Characters.schema';

@Resolver(Character)
class CharactersResolver {
  @Query(() => [Character])
  async characters(): Promise<Character[]> {
    const listCharactersService = container.resolve(ListCharactersService);

    const characters = await listCharactersService.execute({});
    return classToClass(characters);
  }

  @Query(() => Character, { nullable: true })
  async character(@Arg('id') id: string): Promise<Character | undefined> {
    const listCharacterService = container.resolve(ListCharacterService);

    const character = await listCharacterService.execute({ id });
    return classToClass(character);
  }

  @Mutation(() => Character)
  async createCharacter(
    @Arg('data') data: CreateCharacterInput,
  ): Promise<Character> {
    const { name, description, age } = data;

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
    @Arg('data') data: UpdateCharacterInput,
  ): Promise<Character> {
    const { id, name, description, age } = data;

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
}

export default CharactersResolver;
