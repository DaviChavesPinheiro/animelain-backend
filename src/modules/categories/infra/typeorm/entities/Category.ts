import AnimeCategory from '@modules/animes/infra/typeorm/entities/AnimeCategory';
import INode from '@shared/infra/http/schemas/Nodes.schema';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@ObjectType({ implements: [INode] })
@Entity('categories')
class Category extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name: string;

  @OneToMany(() => AnimeCategory, animeCategory => animeCategory.category)
  animesCategories: AnimeCategory[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Category;
