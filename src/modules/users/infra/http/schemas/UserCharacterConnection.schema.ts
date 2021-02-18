import IConnection from '@shared/infra/http/schemas/Connection.schema';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { ObjectType, Field } from 'type-graphql';
import UserCharacter from '../../typeorm/entities/UserCharacter';

@ObjectType({ implements: [IConnection] })
export default class UserCharacterConnection implements IConnection {
  @Field(() => [UserCharacter])
  edges: UserCharacter[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
