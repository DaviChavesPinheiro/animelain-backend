/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';

@InputType()
export class FindCharacterInput {
  @Field(() => String, { nullable: true })
  search?: string;
}

@InputType()
export class CreateCharacterInput {
  @Field(() => String)
  @MaxLength(255)
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  age?: number;
}

@InputType()
export class UpdateCharacterInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  name?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  age?: number;
}
