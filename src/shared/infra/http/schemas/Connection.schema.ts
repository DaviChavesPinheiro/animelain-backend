import { Field, InterfaceType } from 'type-graphql';
import IEdge from './Edge.schema';
import PageInfo from './PageInfo.schema';

@InterfaceType()
export default abstract class IConnection {
  @Field(() => [IEdge])
  edges: IEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
