/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';
import { CharacterRole } from '../../typeorm/entities/AnimeCharacter';

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

@InputType()
export class AddAnimeCharacterInput {
  @Field(() => CharacterRole)
  role: CharacterRole;

  @Field(() => String)
  @IsUUID()
  characterId: string;

  @Field(() => String)
  @IsUUID()
  animeId: string;
}

@InputType()
export class RemoveAnimeCharacterInput {
  @Field(() => String)
  @IsUUID()
  characterId: string;

  @Field(() => String)
  @IsUUID()
  animeId: string;
}

@InputType()
export class AddAnimeCategoryInput {
  @Field(() => Int)
  @Min(1)
  @Max(3)
  score: number;

  @Field(() => String)
  @IsUUID()
  categoryId: string;

  @Field(() => String)
  @IsUUID()
  animeId: string;
}

@InputType()
export class RemoveAnimeCategoryInput {
  @Field(() => String)
  @IsUUID()
  categoryId: string;

  @Field(() => String)
  @IsUUID()
  animeId: string;
}
