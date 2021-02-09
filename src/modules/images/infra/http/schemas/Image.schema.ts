/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, MaxLength } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';
import { ImageType } from '../../typeorm/entities/Image';

@InputType()
export class FindImageInput {
  @Field(() => String, { nullable: true })
  search?: string;
}

@InputType()
export class CreateImageInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => ImageType, { nullable: true })
  type?: ImageType;
}

@InputType()
export class UpdateImageInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  width?: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  height?: number;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  mimeType?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  encoding?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  size?: number;

  @Field(() => ImageType, { nullable: true })
  type?: ImageType;
}
