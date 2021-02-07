import IConnection from '@shared/infra/http/schemas/Connection.schema';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { ObjectType, Field } from 'type-graphql';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';

@ObjectType({ implements: [IConnection] })
export default class CharacterConnection implements IConnection {
  @Field(() => [MediaCharacter])
  edges: MediaCharacter[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
