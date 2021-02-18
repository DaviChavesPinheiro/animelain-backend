/* eslint-disable no-shadow */
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import INode from '@shared/infra/http/schemas/Node.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {
  Authorized,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import Image from '@modules/images/infra/typeorm/entities/Image';
import { IAuthCheckerData } from '@shared/infra/http/schemas';
import UserMediaConnection from '../../http/schemas/UserMediaConnection.schema';
import UserMedia from './UserMedia';

export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType({ implements: [INode] })
@Entity('users')
class User extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name: string;

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    isOwner: ({ context, root }) => root.id === context.user.id,
  })
  @Field(() => String)
  @Column('varchar', { unique: true })
  email: string;

  @Field(() => String)
  @Column('varchar')
  @Exclude()
  password: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  avatarId?: string;

  @Field(() => Image, { nullable: true })
  @ManyToOne(() => Image, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'avatarId' })
  avatar?: Image;

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    isOwner: ({ context, root }) => root.id === context.user.id,
  })
  @Field(() => [UserRole], { nullable: true })
  @Column('simple-array', { nullable: true })
  roles?: UserRole[];

  @Field(() => UserMediaConnection)
  userMedias: UserMediaConnection;

  @OneToMany(() => UserMedia, userMedia => userMedia.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  usersMedias: UserMedia[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.avatar}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
