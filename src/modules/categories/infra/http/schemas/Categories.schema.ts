/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, Max, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';

@InputType()
export class FindCategoryInput {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 50 })
  @IsPositive()
  @Max(50)
  perPage: number;
}

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @MaxLength(255)
  name: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  name?: string;
}
