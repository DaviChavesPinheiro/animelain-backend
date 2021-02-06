/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';
import { MediaSeason, MediaType } from '../../typeorm/entities/Media';
import { CharacterRole } from '../../typeorm/entities/MediaCharacter';

@InputType()
export class FindMediaInput {
  @Field(() => MediaType, { nullable: true })
  type?: MediaType;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => MediaSeason, { nullable: true })
  season?: MediaSeason;

  @Field(() => [String], { nullable: true })
  categoryIn?: string[];

  @Field(() => [String], { nullable: true })
  characterIn?: string[];

  @Field(() => Int, { nullable: true })
  @IsPositive()
  episodesAmount?: number;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 50 })
  @IsPositive()
  @Max(50)
  perPage: number;
}

@InputType()
export class CreateMediaInput {
  @Field(() => MediaType)
  type: MediaType;

  @Field(() => String)
  @MaxLength(255)
  title: string;

  @Field(() => MediaSeason, { nullable: true })
  season?: MediaSeason;

  @Field(() => String, { nullable: true })
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  episodesAmount?: number;
}

@InputType()
export class UpdateMediaInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => MediaType, { nullable: true })
  type?: MediaType;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  title?: string;

  @Field(() => MediaSeason, { nullable: true })
  season?: MediaSeason;

  @Field(() => String, { nullable: true })
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  episodesAmount?: number;
}

@InputType()
export class AddMediaCharacterInput {
  @Field(() => CharacterRole)
  role: CharacterRole;

  @Field(() => String)
  @IsUUID()
  characterId: string;

  @Field(() => String)
  @IsUUID()
  mediaId: string;
}

@InputType()
export class RemoveMediaCharacterInput {
  @Field(() => String)
  @IsUUID()
  characterId: string;

  @Field(() => String)
  @IsUUID()
  mediaId: string;
}

@InputType()
export class AddMediaCategoryInput {
  @Field(() => Int)
  @Min(1)
  @Max(3)
  score: number;

  @Field(() => String)
  @IsUUID()
  categoryId: string;

  @Field(() => String)
  @IsUUID()
  mediaId: string;
}

@InputType()
export class RemoveMediaCategoryInput {
  @Field(() => String)
  @IsUUID()
  categoryId: string;

  @Field(() => String)
  @IsUUID()
  mediaId: string;
}
