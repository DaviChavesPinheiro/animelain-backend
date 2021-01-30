import Category from '@modules/categories/infra/typeorm/entities/Category';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import AnimeCategory from '../../typeorm/entities/AnimeCategory';

@Resolver(AnimeCategory)
class AnimeCategoryResolver {
  @FieldResolver()
  async node(@Root() animeCategory: AnimeCategory): Promise<Category> {
    const listCategoryService = container.resolve(ListCategoryService);

    const category = (await listCategoryService.execute({
      id: animeCategory.categoryId,
    })) as Category;

    return classToClass(category);
  }
}

export default AnimeCategoryResolver;
