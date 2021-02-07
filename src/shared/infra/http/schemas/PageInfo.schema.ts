import { IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

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

@InputType()
export class PaginateMediaInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 50 })
  @IsPositive()
  @Max(50)
  perPage: number;
}
