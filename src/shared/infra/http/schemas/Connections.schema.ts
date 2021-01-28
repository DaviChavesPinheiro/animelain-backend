import { Field, InterfaceType } from 'type-graphql';
import IEdge from './Edges.schema';

@InterfaceType()
export default abstract class IConnection {
  @Field(() => [IEdge])
  edges: IEdge[];
}
