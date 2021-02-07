/* eslint-disable import/prefer-default-export */
import { IsUUID, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class FindCategoryInput {
  @Field(() => String, { nullable: true })
  search?: string;
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
