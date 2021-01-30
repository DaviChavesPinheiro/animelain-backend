import Category from '@modules/categories/infra/typeorm/entities/Category';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import MediaCategory from '../../typeorm/entities/MediaCategory';

@Resolver(MediaCategory)
class MediaCategoryResolver {
  @FieldResolver()
  async node(@Root() mediaCategory: MediaCategory): Promise<Category> {
    const listCategoryService = container.resolve(ListCategoryService);

    const category = (await listCategoryService.execute({
      id: mediaCategory.categoryId,
    })) as Category;

    return classToClass(category);
  }
}

export default MediaCategoryResolver;
