import { FieldResolver, Resolver, Root } from 'type-graphql';
import User from '../../typeorm/entities/User';
import Recents from '../schemas/Recents.schema';

@Resolver(Recents)
class RecentsResolver {
  @FieldResolver()
  async medias(@Root() user: User): Promise<User> {
    return user;
  }
}

export default RecentsResolver;
