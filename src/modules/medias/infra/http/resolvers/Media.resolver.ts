import ListMediaService from '@modules/medias/services/ListMediaService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import {
  Arg,
  Authorized,
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
import User, { UserRole } from '@modules/users/infra/typeorm/entities/User';
import AddMediaCharacterService from '@modules/medias/services/AddMediaCharacterService';
import RemoveMediaCharacterService from '@modules/medias/services/RemoveMediaCharacterService';
import AddMediaCategoryService from '@modules/medias/services/AddMediaCategoryService';
import RemoveMediaCategoryService from '@modules/medias/services/RemoveMediaCategoryService';
import { PaginateMediaInput } from '@shared/infra/http/schemas/PageInfo.schema';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'graphql-tools';
import UpdateMediaCoverImageService from '@modules/medias/services/UpdateMediaCoverImageService';
import GraphQLUploadFileProvider from '@shared/container/providers/UploadFileProvider/implementations/GraphQLFileUploadProvider';
import UpdateMediaBannerImageService from '@modules/medias/services/UpdateMediaBannerImageService';
import { IAuthCheckerData } from '@shared/infra/http/schemas';
import ListUserMediaService from '@modules/users/services/ListUserMediaService';
import { UserMediaStatus } from '@modules/users/infra/typeorm/entities/UserMedia';
import IContext from '../../../../../@types/IContext';
import Media from '../../typeorm/entities/Media';
import {
  AddMediaCharacterInput,
  AddMediaCategoryInput,
  CreateMediaInput,
  RemoveMediaCharacterInput,
  RemoveMediaCategoryInput,
  UpdateMediaInput,
} from '../schemas/Media.schema';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';
import MediaCategory from '../../typeorm/entities/MediaCategory';

@Resolver(Media)
class MediasResolver {
  @Query(() => Media, { nullable: true })
  async media(@Arg('id') id: string): Promise<Media | undefined> {
    const listMediaService = container.resolve(ListMediaService);

    const media = await listMediaService.execute({ id });
    return classToClass(media);
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
  @Mutation(() => Media)
  async deleteMedia(@Arg('id') id: string): Promise<Media> {
    const deleteMediaService = container.resolve(DeleteMediaService);

    const media = await deleteMediaService.execute({ id });

    return classToClass(media);
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
  @Mutation(() => Media)
  async updateMediaCoverImage(
    @Arg('mediaId') mediaId: string,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
  ): Promise<Media> {
    const graphQLUploadFileProvider = new GraphQLUploadFileProvider();

    const { fileName } = await graphQLUploadFileProvider.uploadFile(file);

    const updateMediaCoverImageService = container.resolve(
      UpdateMediaCoverImageService,
    );

    const mediaUpdated = await updateMediaCoverImageService.execute({
      mediaId,
      coverImageName: fileName,
    });

    return mediaUpdated;
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  })
  @Mutation(() => Media)
  async updateMediaBannerImage(
    @Arg('mediaId') mediaId: string,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
  ): Promise<Media> {
    const graphQLUploadFileProvider = new GraphQLUploadFileProvider();

    const { fileName } = await graphQLUploadFileProvider.uploadFile(file);

    const updateMediaBannerImageService = container.resolve(
      UpdateMediaBannerImageService,
    );

    const mediaUpdated = await updateMediaBannerImageService.execute({
      mediaId,
      bannerImageName: fileName,
    });

    return mediaUpdated;
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
    @Root() media: Media,
    @Arg('input') input: PaginateMediaInput,
  ): Promise<any> {
    return { media, input };
  }

  @FieldResolver()
  async categories(
    @Root() media: Media,
    @Arg('input') input: PaginateMediaInput,
  ): Promise<any> {
    return { media, input };
  }

  @FieldResolver()
  async isFavorited(
    @Root() media: Media,
    @Ctx() context: IContext,
  ): Promise<boolean | undefined> {
    const listUserMediaService = container.resolve(ListUserMediaService);

    const favoritedMedia = await listUserMediaService.execute({
      userId: context.user.id,
      mediaId: media.id,
      userMediaStatus: UserMediaStatus.FAVORITE,
    });

    return !!favoritedMedia;
  }
}

export default MediasResolver;
