import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import ListAnimeService from '@modules/animes/services/ListAnimeService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import RecentUserAnime from '../../typeorm/entities/RecentUserAnime';

@Resolver(RecentUserAnime)
class RecentUserAnimeResolver {
  @FieldResolver()
  async node(@Root() recentUserAnime: RecentUserAnime): Promise<Anime> {
    const listAnimeService = container.resolve(ListAnimeService);

    const anime = (await listAnimeService.execute({
      id: recentUserAnime.animeId,
    })) as Anime;

    return classToClass(anime);
  }
}

export default RecentUserAnimeResolver;
