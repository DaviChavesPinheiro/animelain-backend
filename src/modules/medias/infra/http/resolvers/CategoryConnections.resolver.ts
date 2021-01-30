import ListMediaCategoriesService from '@modules/medias/services/ListMediaCategoriesService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import Media from '../../typeorm/entities/Media';
import MediaCategory from '../../typeorm/entities/MediaCategory';
import CategoryConnections from '../schemas/CategoryConnections.schema';

@Resolver(CategoryConnections)
class CategoryConnectionsResolver {
  @FieldResolver()
  async edges(@Root() media: Media): Promise<MediaCategory[]> {
    const listMediaCategoriesService = container.resolve(
      ListMediaCategoriesService,
    );

    const mediaCategories = await listMediaCategoriesService.execute({
      mediaId: media.id,
    });

    return classToClass(mediaCategories);
  }
}

export default CategoryConnectionsResolver;
