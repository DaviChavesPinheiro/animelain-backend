import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType()
export default abstract class INode {
  @Field(() => ID)
  id: string;
}
