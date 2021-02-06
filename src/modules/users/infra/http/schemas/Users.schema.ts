/* eslint-disable import/prefer-default-export */
import { IsEmail, IsPositive, IsUUID, Max, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';

@InputType()
export class FindUserInput {
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
export class CreateUserInput {
  @Field(() => String)
  @MaxLength(255)
  name: string;

  @Field(() => String)
  @MaxLength(255)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MaxLength(255)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  name?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  @IsEmail()
  email?: string;
}

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsUUID()
  token: string;

  @Field(() => String)
  @MaxLength(255)
  password: string;
}

@InputType()
export class ToggleFavoriteMediaInput {
  @Field(() => String)
  @IsUUID()
  mediaId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;
}

@InputType()
export class ToggleRecentMediaInput {
  @Field(() => String)
  @IsUUID()
  mediaId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;
}
