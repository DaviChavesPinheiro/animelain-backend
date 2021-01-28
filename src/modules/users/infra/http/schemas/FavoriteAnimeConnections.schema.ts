import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import FavoriteUserAnime from '../../typeorm/entities/FavoriteUserAnime';

@ObjectType({ implements: [IConnection] })
export default class FavoriteAnimeConnection implements IConnection {
  @Field(() => [FavoriteUserAnime])
  edges: FavoriteUserAnime[];
}
