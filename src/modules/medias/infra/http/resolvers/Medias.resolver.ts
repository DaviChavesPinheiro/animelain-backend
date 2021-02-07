import ListMediasService from '@modules/medias/services/ListMediasService';
import ListMediaService from '@modules/medias/services/ListMediaService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import CreateMediaService from '@modules/medias/services/CreateMediaService';
import UpdateMediaService from '@modules/medias/services/UpdateMediaService';
import DeleteMediaService from '@modules/medias/services/DeleteMediaService';
import ListUserService from '@modules/users/services/ListUserService';
import User from '@modules/users/infra/typeorm/entities/User';
import AddMediaCharacterService from '@modules/medias/services/AddMediaCharacterService';
import RemoveMediaCharacterService from '@modules/medias/services/RemoveMediaCharacterService';
import AddMediaCategoryService from '@modules/medias/services/AddMediaCategoryService';
import RemoveMediaCategoryService from '@modules/medias/services/RemoveMediaCategoryService';
import { IResolverArgs } from '../../../../../@types/IResolvers';
import IContext from '../../../../../@types/IContext';
import Media from '../../typeorm/entities/Media';
import {
  AddMediaCharacterInput,
  AddMediaCategoryInput,
  CreateMediaInput,
  RemoveMediaCharacterInput,
  RemoveMediaCategoryInput,
  UpdateMediaInput,
  FindMediaInput,
  PaginateMediaCharactersInput,
} from '../schemas/Medias.schema';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';
import MediaCategory from '../../typeorm/entities/MediaCategory';

@Resolver(Media)
class MediasResolver {
  @Query(() => [Media])
  async medias(@Arg('input') input: FindMediaInput): Promise<Media[]> {
    const {
      type,
      search,
      title,
      season,
      categoryIn,
      characterIn,
      episodesAmount,
      page,
      perPage,
    } = input;

    const listMediasService = container.resolve(ListMediasService);

    const medias = await listMediasService.execute({
      type,
      search,
      title,
      season,
      categoryIn,
      characterIn,
      episodesAmount,
      page,
      perPage,
    });
    return classToClass(medias);
  }

  @Query(() => Media, { nullable: true })
  async media(@Arg('id') id: string): Promise<Media | undefined> {
    const listMediaService = container.resolve(ListMediaService);

    const media = await listMediaService.execute({ id });
    return classToClass(media);
  }

  @Mutation(() => Media)
  async createMedia(
    @Arg('input') input: CreateMediaInput,
    @Ctx() context: IContext,
  ): Promise<Media> {
    const { type, title, season, description, episodesAmount } = input;

    const createMediaService = container.resolve(CreateMediaService);

    const media = await createMediaService.execute({
      type,
      title,
      season,
      description,
      episodesAmount,
      createdById: context.user.id,
    });

    return classToClass(media);
  }

  @Mutation(() => Media)
  async updateMedia(@Arg('input') input: UpdateMediaInput): Promise<Media> {
    const { id, type, title, season, description, episodesAmount } = input;

    const updateMediaService = container.resolve(UpdateMediaService);

    const media = await updateMediaService.execute({
      id,
      type,
      title,
      season,
      description,
      episodesAmount,
    });

    return classToClass(media);
  }

  @Mutation(() => Media)
  async deleteMedia(@Arg('id') id: string): Promise<Media> {
    const deleteMediaService = container.resolve(DeleteMediaService);

    const media = await deleteMediaService.execute({ id });

    return classToClass(media);
  }

  @Mutation(() => MediaCharacter)
  async addMediaCharacter(
    @Arg('input') input: AddMediaCharacterInput,
  ): Promise<MediaCharacter> {
    const { role, mediaId, characterId } = input;

    const addMediaCharacterService = container.resolve(
      AddMediaCharacterService,
    );

    const mediaCharacter = await addMediaCharacterService.execute({
      role,
      mediaId,
      characterId,
    });

    return classToClass(mediaCharacter);
  }

  @Mutation(() => MediaCharacter)
  async removeMediaCharacter(
    @Arg('input') input: RemoveMediaCharacterInput,
  ): Promise<MediaCharacter> {
    const { mediaId, characterId } = input;

    const removeMediaCharacterService = container.resolve(
      RemoveMediaCharacterService,
    );

    const mediaCharacter = await removeMediaCharacterService.execute({
      mediaId,
      characterId,
    });

    return classToClass(mediaCharacter);
  }

  @Mutation(() => MediaCategory)
  async addMediaCategory(
    @Arg('input') input: AddMediaCategoryInput,
  ): Promise<MediaCategory> {
    const { score, mediaId, categoryId } = input;

    const addMediaCategoryService = container.resolve(AddMediaCategoryService);

    const mediaCategory = await addMediaCategoryService.execute({
      score,
      mediaId,
      categoryId,
    });

    return classToClass(mediaCategory);
  }

  @Mutation(() => MediaCategory)
  async removeMediaCategory(
    @Arg('input') input: RemoveMediaCategoryInput,
  ): Promise<MediaCategory> {
    const { mediaId, categoryId } = input;

    const removeMediaCategoryService = container.resolve(
      RemoveMediaCategoryService,
    );

    const mediaCategory = await removeMediaCategoryService.execute({
      mediaId,
      categoryId,
    });

    return classToClass(mediaCategory);
  }

  @FieldResolver({ nullable: true })
  async createdBy(@Root() media: Media): Promise<User | null> {
    const listUserService = container.resolve(ListUserService);

    if (media.createdById) {
      const user = await listUserService.execute({
        userId: media.createdById,
      });

      return classToClass(user);
    }
    return null;
  }

  @FieldResolver()
  async characters(
    @Arg('input') input: PaginateMediaCharactersInput,
    @Root() root: Media,
  ): Promise<IResolverArgs> {
    return { root, input };
  }

  @FieldResolver()
  async categories(@Root() media: Media): Promise<Media> {
    return media;
  }
}

export default MediasResolver;
