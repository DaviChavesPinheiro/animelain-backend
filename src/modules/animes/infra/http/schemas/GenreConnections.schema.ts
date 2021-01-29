import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import AnimeGenre from '../../typeorm/entities/AnimeGenre';

@ObjectType({ implements: [IConnection] })
export default class GenreConnection implements IConnection {
  @Field(() => [AnimeGenre])
  edges: AnimeGenre[];
}
