/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';

@InputType()
export class CreateAnimeInput {
  @Field(() => String)
  @MaxLength(255)
  title: string;

  @Field(() => String, { nullable: true })
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  episodesAmount?: number;
}

@InputType()
export class UpdateAnimeInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  title?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  episodesAmount?: number;
}