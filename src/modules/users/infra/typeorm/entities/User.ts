import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import RecentUserAnime from './RecentUserAnime';
import FavoriteUserAnime from './FavoriteUserAnime';

@ObjectType()
@Entity('users')
class User extends BaseEntity {
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
  @Column('varchar', { nullable: true })
  avatar?: string;

  @OneToMany(() => RecentUserAnime, recentUserAnime => recentUserAnime.user)
  recentUsersAnimes: RecentUserAnime[];

  @OneToMany(
    () => FavoriteUserAnime,
    favoriteUserAnime => favoriteUserAnime.user,
  )
  favoriteUsersAnimes: FavoriteUserAnime[];

  @Column('boolean', { default: false })
  isAdmin = false;

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
