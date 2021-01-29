import ListAnimeGenresService from '@modules/animes/services/ListAnimeGenresService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import Anime from '../../typeorm/entities/Anime';
import AnimeGenre from '../../typeorm/entities/AnimeGenre';
import GenreConnections from '../schemas/GenreConnections.schema';

@Resolver(GenreConnections)
class GenreConnectionsResolver {
  @FieldResolver()
  async edges(@Root() anime: Anime): Promise<AnimeGenre[]> {
    const listAnimeGenresService = container.resolve(ListAnimeGenresService);

    const animeGenres = await listAnimeGenresService.execute({
      animeId: anime.id,
    });

    return classToClass(animeGenres);
  }
}

export default GenreConnectionsResolver;
