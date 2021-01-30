import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import FavoriteUserMedia from '../../typeorm/entities/FavoriteUserMedia';

@ObjectType({ implements: [IConnection] })
export default class FavoriteMediaConnection implements IConnection {
  @Field(() => [FavoriteUserMedia])
  edges: FavoriteUserMedia[];
}
