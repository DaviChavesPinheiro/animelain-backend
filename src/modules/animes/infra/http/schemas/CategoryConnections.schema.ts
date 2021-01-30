import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import AnimeCategory from '../../typeorm/entities/AnimeCategory';

@ObjectType({ implements: [IConnection] })
export default class CategoryConnection implements IConnection {
  @Field(() => [AnimeCategory])
  edges: AnimeCategory[];
}
