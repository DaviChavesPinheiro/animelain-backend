import { ObjectType, Field } from 'type-graphql';
import FavoriteAnimeConnection from './FavoriteAnimeConnections.schema';

@ObjectType()
export default class Favorites {
  @Field(() => FavoriteAnimeConnection)
  animes: FavoriteAnimeConnection;
}
