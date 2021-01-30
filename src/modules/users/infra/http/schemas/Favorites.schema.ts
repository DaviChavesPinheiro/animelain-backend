import { ObjectType, Field } from 'type-graphql';
import FavoriteMediaConnection from './FavoriteMediaConnections.schema';

@ObjectType()
export default class Favorites {
  @Field(() => FavoriteMediaConnection)
  medias: FavoriteMediaConnection;
}
