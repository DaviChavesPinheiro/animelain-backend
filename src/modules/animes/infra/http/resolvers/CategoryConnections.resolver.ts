import ListAnimeCategoriesService from '@modules/animes/services/ListAnimeCategoriesService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import Anime from '../../typeorm/entities/Anime';
import AnimeCategory from '../../typeorm/entities/AnimeCategory';
import CategoryConnections from '../schemas/CategoryConnections.schema';

@Resolver(CategoryConnections)
class CategoryConnectionsResolver {
  @FieldResolver()
  async edges(@Root() anime: Anime): Promise<AnimeCategory[]> {
    const listAnimeCategoriesService = container.resolve(
      ListAnimeCategoriesService,
    );

    const animeCategories = await listAnimeCategoriesService.execute({
      animeId: anime.id,
    });

    return classToClass(animeCategories);
  }
}

export default CategoryConnectionsResolver;
