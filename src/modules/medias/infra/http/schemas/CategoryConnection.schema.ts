import IConnection from '@shared/infra/http/schemas/Connection.schema';
import { ObjectType, Field } from 'type-graphql';
import MediaCategory from '../../typeorm/entities/MediaCategory';

@ObjectType({ implements: [IConnection] })
export default class CategoryConnection implements IConnection {
  @Field(() => [MediaCategory])
  edges: MediaCategory[];
}
