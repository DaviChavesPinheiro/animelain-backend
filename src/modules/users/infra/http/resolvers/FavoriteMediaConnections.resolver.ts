import ListFavoriteUserMediasService from '@modules/users/services/ListFavoriteUserMediasService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import FavoriteUserMedia from '../../typeorm/entities/FavoriteUserMedia';
import User from '../../typeorm/entities/User';
import FavoriteMediaConnections from '../schemas/FavoriteMediaConnections.schema';

@Resolver(FavoriteMediaConnections)
class FavoriteMediaConnectionsResolver {
  @FieldResolver()
  async edges(@Root() user: User): Promise<FavoriteUserMedia[]> {
    const listFavoriteUserMedias = container.resolve(
      ListFavoriteUserMediasService,
    );

    const favoriteUsersMedias = await listFavoriteUserMedias.execute({
      userId: user.id,
    });

    return classToClass(favoriteUsersMedias);
  }
}

export default FavoriteMediaConnectionsResolver;
