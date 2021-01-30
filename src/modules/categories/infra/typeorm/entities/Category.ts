import MediaCategory from '@modules/medias/infra/typeorm/entities/MediaCategory';
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

  @OneToMany(() => MediaCategory, mediaCategory => mediaCategory.category)
  mediasCategories: MediaCategory[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Category;
