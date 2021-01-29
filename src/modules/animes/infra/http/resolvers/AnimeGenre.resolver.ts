import Category from '@modules/categories/infra/typeorm/entities/Category';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import AnimeGenre from '../../typeorm/entities/AnimeGenre';

@Resolver(AnimeGenre)
class AnimeGenreResolver {
  @FieldResolver()
  async node(@Root() animeGenre: AnimeGenre): Promise<Category> {
    const listCategoryService = container.resolve(ListCategoryService);

    const category = (await listCategoryService.execute({
      id: animeGenre.categoryId,
    })) as Category;

    return classToClass(category);
  }
}

export default AnimeGenreResolver;
