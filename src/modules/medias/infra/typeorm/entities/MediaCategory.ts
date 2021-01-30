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
import Media from './Media';

@ObjectType({ implements: [IEdge] })
@Entity('medias_categories')
class MediaCategory extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column('integer')
  score: number;

  @Field(() => String)
  @Column('uuid')
  mediaId: string;

  @Field(() => String)
  @Column('uuid')
  categoryId: string;

  @ManyToOne(() => Media, media => media.mediasCategories)
  @JoinColumn({ name: 'mediaId' })
  media: Media;

  @ManyToOne(() => Category, category => category.mediasCategories)
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

export default MediaCategory;
