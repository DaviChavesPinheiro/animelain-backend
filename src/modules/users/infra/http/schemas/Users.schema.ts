/* eslint-disable import/prefer-default-export */
import { IsEmail, IsUUID, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

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
