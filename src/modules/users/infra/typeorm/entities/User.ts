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
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Image from '@modules/images/infra/typeorm/entities/Image';
import UserMediaConnection from '../../http/schemas/UserMediaConnection.schema';

@ObjectType({ implements: [INode] })
@Entity('users')
class User extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name: string;

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

  @Column('boolean', { default: false })
  isAdmin = false;

  @Field(() => UserMediaConnection)
  userMedias: UserMediaConnection;

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
