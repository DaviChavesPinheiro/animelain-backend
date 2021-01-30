import ListRecentUserMediasService from '@modules/users/services/ListRecentUserMediasService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import RecentUserMedia from '../../typeorm/entities/RecentUserMedia';
import User from '../../typeorm/entities/User';
import RecentMediaConnections from '../schemas/RecentMediaConnections.schema';

@Resolver(RecentMediaConnections)
class RecentMediaConnectionsResolver {
  @FieldResolver()
  async edges(@Root() user: User): Promise<RecentUserMedia[]> {
    const listRecentUserMedias = container.resolve(ListRecentUserMediasService);

    const favoriteUsersMedias = await listRecentUserMedias.execute({
      userId: user.id,
    });

    return classToClass(favoriteUsersMedias);
  }
}

export default RecentMediaConnectionsResolver;
