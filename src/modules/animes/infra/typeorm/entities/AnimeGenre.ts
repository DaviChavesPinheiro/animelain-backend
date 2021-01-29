import Category from '@modules/categories/infra/typeorm/entities/Category';
import IEdge from '@shared/infra/http/schemas/Edges.schema';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import Anime from './Anime';

@ObjectType({ implements: [IEdge] })
@Entity('animes_genres')
class AnimeGenre extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column('integer')
  score: number;

  @Field(() => String)
  @Column('uuid')
  animeId: string;

  @Field(() => String)
  @Column('uuid')
  categoryId: string;

  @ManyToOne(() => Anime, anime => anime.animesGenres)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @ManyToOne(() => Category, category => category.genres)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Field(() => Category)
  node: Category;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default AnimeGenre;
