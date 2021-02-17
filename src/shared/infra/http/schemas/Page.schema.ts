import Category from '@modules/categories/infra/typeorm/entities/Category';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import Image from '@modules/images/infra/typeorm/entities/Image';
import Media from '@modules/medias/infra/typeorm/entities/Media';
import User from '@modules/users/infra/typeorm/entities/User';
import { IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import PageInfo from './PageInfo.schema';

@ObjectType()
export default class Page {
  @Field(() => [Media])
  medias: Media[];

  @Field(() => [User])
  users: User[];

  @Field(() => [Character])
  characters: Character[];

  @Field(() => [Category])
  categories: Category[];

  @Field(() => [Image])
  images: Image[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@InputType()
export class PageInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 50 })
  @IsPositive()
  @Max(50)
  perPage: number;
}
