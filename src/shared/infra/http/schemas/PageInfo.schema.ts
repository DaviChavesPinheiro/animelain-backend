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

  static from(total: number, page: number, perPage: number): PageInfo {
    const pageInfo = new PageInfo();
    pageInfo.total = total;
    pageInfo.currentPage = page;
    pageInfo.perPage = perPage;
    pageInfo.lastPage = Math.min(1, Math.ceil(total / perPage));
    pageInfo.hasNextPage = page < pageInfo.lastPage;

    return pageInfo;
  }
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
