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

interface IRoot {
  media: Media;
  input: PaginateMediaInput;
}

@Resolver(CategoryConnection)
class CategoryConnectionsResolver {
  @FieldResolver()
  async edges(@Root() { media, input }: IRoot): Promise<MediaCategory[]> {
    const listMediaCategoriesService = container.resolve(
      ListMediaCategoriesService,
    );

    const mediaCategories = await listMediaCategoriesService.execute({
      mediaId: media.id,
      page: input.page,
      perPage: input.perPage,
    });

    return classToClass(mediaCategories);
  }

  @FieldResolver(() => PageInfo)
  async pageInfo(@Root() { media, input }: IRoot): Promise<PageInfo> {
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
