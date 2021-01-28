import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import RecentUserAnime from '../../typeorm/entities/RecentUserAnime';

@ObjectType({ implements: [IConnection] })
export default class RecentAnimeConnection implements IConnection {
  @Field(() => [RecentUserAnime])
  edges: RecentUserAnime[];
}
