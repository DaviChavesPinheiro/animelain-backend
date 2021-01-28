import ListRecentUserAnimesService from '@modules/users/services/ListRecentUserAnimesService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import RecentUserAnime from '../../typeorm/entities/RecentUserAnime';
import User from '../../typeorm/entities/User';
import RecentAnimeConnections from '../schemas/RecentAnimeConnections.schema';

@Resolver(RecentAnimeConnections)
class RecentAnimeConnectionsResolver {
  @FieldResolver()
  async edges(@Root() user: User): Promise<RecentUserAnime[]> {
    const listRecentUserAnimes = container.resolve(ListRecentUserAnimesService);

    const favoriteUsersAnimes = await listRecentUserAnimes.execute({
      userId: user.id,
    });

    return classToClass(favoriteUsersAnimes);
  }
}

export default RecentAnimeConnectionsResolver;
