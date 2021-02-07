import { Field, ID, InterfaceType } from 'type-graphql';
import INode from './Node.schema';

@InterfaceType()
export default abstract class IEdge {
  @Field(() => ID)
  id: string;

  @Field(() => INode)
  node: INode;
}
