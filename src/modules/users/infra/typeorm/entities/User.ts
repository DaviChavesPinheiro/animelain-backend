import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import RecentUserAnime from './RecentUserAnime';
import FavoriteUserAnime from './FavoriteUserAnime';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar?: string;

  @OneToMany(() => RecentUserAnime, recentUserAnime => recentUserAnime.user)
  recent_users_animes: RecentUserAnime[];

  @OneToMany(
    () => FavoriteUserAnime,
    favoriteUserAnime => favoriteUserAnime.user,
  )
  favorite_users_animes: FavoriteUserAnime[];

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.avatar}`;
      case 's3':
        return `http://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
