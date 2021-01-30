import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import RecentUserMedia from '../../typeorm/entities/RecentUserMedia';

@ObjectType({ implements: [IConnection] })
export default class RecentMediaConnection implements IConnection {
  @Field(() => [RecentUserMedia])
  edges: RecentUserMedia[];
}
