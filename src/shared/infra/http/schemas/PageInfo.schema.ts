import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export default class PageInfo {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  lastPage: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
