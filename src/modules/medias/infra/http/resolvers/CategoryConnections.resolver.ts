import ListMediaCategoriesService from '@modules/medias/services/ListMediaCategoriesService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import PageInfo, {
  PaginateMediaInput,
} from '@shared/infra/http/schemas/PageInfo.schema';
import ListMediaCategoriesServicePageInfo from '@modules/medias/services/ListMediaCategoriesServicePageInfo';
import Media from '../../typeorm/entities/Media';
import MediaCategory from '../../typeorm/entities/MediaCategory';
import CategoryConnection from '../schemas/CategoryConnections.schema';
import { IResolverArgs } from '../../../../../@types/IResolvers';

@Resolver(CategoryConnection)
class CategoryConnectionsResolver {
  @FieldResolver()
  async edges(
    @Root() root: IResolverArgs<Media, PaginateMediaInput>,
  ): Promise<MediaCategory[]> {
    const { root: media } = root;

    const listMediaCategoriesService = container.resolve(
      ListMediaCategoriesService,
    );

    const mediaCategories = await listMediaCategoriesService.execute({
      mediaId: media.id,
    });

    return classToClass(mediaCategories);
  }

  @FieldResolver(() => PageInfo)
  async pageInfo(
    @Root() root: IResolverArgs<Media, PaginateMediaInput>,
  ): Promise<PageInfo> {
    const { root: media, input } = root;

    const listMediaCategoriesServicePageInfo = container.resolve(
      ListMediaCategoriesServicePageInfo,
    );

    const mediaCategoriesPageInfo = await listMediaCategoriesServicePageInfo.execute(
      {
        mediaId: media.id,
        page: input.page,
        perPage: input.perPage,
      },
    );

    return classToClass(mediaCategoriesPageInfo);
  }
}

export default CategoryConnectionsResolver;
