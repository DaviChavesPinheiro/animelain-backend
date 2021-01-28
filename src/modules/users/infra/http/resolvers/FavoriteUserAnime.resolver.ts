import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import ListAnimeService from '@modules/animes/services/ListAnimeService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import FavoriteUserAnime from '../../typeorm/entities/FavoriteUserAnime';

@Resolver(FavoriteUserAnime)
class FavoriteUserAnimeResolver {
  @FieldResolver()
  async node(@Root() favoriteUserAnime: FavoriteUserAnime): Promise<Anime> {
    const listAnimeService = container.resolve(ListAnimeService);

    const anime = (await listAnimeService.execute({
      id: favoriteUserAnime.animeId,
    })) as Anime;

    return classToClass(anime);
  }
}

export default FavoriteUserAnimeResolver;
