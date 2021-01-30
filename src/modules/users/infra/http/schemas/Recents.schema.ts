import { ObjectType, Field } from 'type-graphql';
import RecentMediaConnection from './RecentMediaConnections.schema';

@ObjectType()
export default class Recents {
  @Field(() => RecentMediaConnection)
  medias: RecentMediaConnection;
}
