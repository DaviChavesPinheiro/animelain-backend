import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import RecentUserAnime from '@modules/users/infra/typeorm/entities/RecentUserAnime';
import FavoriteUserAnime from '@modules/users/infra/typeorm/entities/FavoriteUserAnime';
import Genre from './Genre';
import AnimeCharacter from './AnimeCharacter';

// todo: create recommendations route
// just list some animes based in user favorites

@Entity('animes')
class Anime extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  episodesAmount: number;

  @Column()
  authors?: string;

  @Column()
  created_by_id?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  created_by: User;

  @Column()
  profile?: string;

  @Column()
  banner?: string;

  @OneToMany(() => Genre, genre => genre.anime)
  genres: Genre[];

  @OneToMany(() => RecentUserAnime, recentUserAnime => recentUserAnime.anime)
  recent_users_animes: RecentUserAnime[];

  @OneToMany(
    () => FavoriteUserAnime,
    favoriteUserAnime => favoriteUserAnime.anime,
  )
  favorite_users_animes: FavoriteUserAnime[];

  @OneToMany(() => AnimeCharacter, animeCharacter => animeCharacter.anime)
  animes_characters: AnimeCharacter[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  isFavorited?: boolean;

  @Expose({ name: 'profile_url' })
  getProfileUrl(): string | null {
    if (!this.profile) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.profile}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.profile}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'banner_url' })
  getBannerUrl(): string | null {
    if (!this.banner) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.banner}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.banner}`;
      default:
        return null;
    }
  }
}

export default Anime;
