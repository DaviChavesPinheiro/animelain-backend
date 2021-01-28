import { ObjectType, Field } from 'type-graphql';
import RecentAnimeConnection from './RecentAnimeConnections.schema';

@ObjectType()
export default class Recents {
  @Field(() => RecentAnimeConnection)
  animes: RecentAnimeConnection;
}
