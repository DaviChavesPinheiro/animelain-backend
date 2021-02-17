import IConnection from '@shared/infra/http/schemas/Connection.schema';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { ObjectType, Field } from 'type-graphql';
import UserMedia from '../../typeorm/entities/UserMedia';

@ObjectType({ implements: [IConnection] })
export default class UserMediaConnection implements IConnection {
  @Field(() => [UserMedia])
  edges: UserMedia[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
