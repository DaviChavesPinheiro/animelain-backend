import Media from '@modules/medias/infra/typeorm/entities/Media';
import IEdge from '@shared/infra/http/schemas/Edges.schema';
import { Field, ID, ObjectType } from 'type-graphql';
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
import User from './User';

@ObjectType({ implements: [IEdge] })
@Entity('recent_users_medias')
class RecentUserMedia extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('uuid')
  mediaId: string;

  @Field(() => String)
  @Column('uuid')
  userId: string;

  @ManyToOne(() => Media, media => media.recentUsersMedias, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'mediaId' })
  media: Media;

  @ManyToOne(() => User, user => user.recentUsersMedias, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Media)
  node: Media;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default RecentUserMedia;
