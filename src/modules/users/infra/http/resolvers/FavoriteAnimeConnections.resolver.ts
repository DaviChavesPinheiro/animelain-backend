import ListFavoriteUserAnimesService from '@modules/users/services/ListFavoriteUserAnimesService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import FavoriteUserAnime from '../../typeorm/entities/FavoriteUserAnime';
import User from '../../typeorm/entities/User';
import FavoriteAnimeConnections from '../schemas/FavoriteAnimeConnections.schema';

@Resolver(FavoriteAnimeConnections)
class FavoriteAnimeConnectionsResolver {
  @FieldResolver()
  async edges(@Root() user: User): Promise<FavoriteUserAnime[]> {
    const listFavoriteUserAnimes = container.resolve(
      ListFavoriteUserAnimesService,
    );

    const favoriteUsersAnimes = await listFavoriteUserAnimes.execute({
      userId: user.id,
    });

    return classToClass(favoriteUsersAnimes);
  }
}

export default FavoriteAnimeConnectionsResolver;
