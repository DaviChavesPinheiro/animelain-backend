import { FieldResolver, Resolver, Root } from 'type-graphql';
import User from '../../typeorm/entities/User';
import Favorites from '../schemas/Favorites.schema';

@Resolver(Favorites)
class FavoritesResolver {
  @FieldResolver()
  async animes(@Root() user: User): Promise<User> {
    return user;
  }
}

export default FavoritesResolver;
