/* eslint-disable no-shadow */
import Media from '@modules/medias/infra/typeorm/entities/Media';
import IEdge from '@shared/infra/http/schemas/Edge.schema';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
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

export enum UserMediaStatus {
  CURRENT = 'CURRENT',
  PLANNING = 'PLANNING',
  FAVORITE = 'FAVORITE',
}

registerEnumType(UserMediaStatus, {
  name: 'UserMediaStatus',
});

@ObjectType({ implements: [IEdge] })
@Entity('users_medias')
class UserMedia extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('uuid')
  mediaId: string;

  @Field(() => String)
  @Column('uuid')
  userId: string;

  @Field(() => UserMediaStatus)
  @Column('varchar')
  userMediaStatus: UserMediaStatus;

  @ManyToOne(() => Media, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'mediaId' })
  media: Media;

  @ManyToOne(() => User, user => user.userMedias, {
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

export default UserMedia;
