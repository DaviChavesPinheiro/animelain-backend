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
import AnimeGenre from './AnimeGenre';
import AnimeCharacter from './AnimeCharacter';

// todo: create recommendations route
// just list some animes based in user favorites

@Entity('animes')
class Anime extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('integer', { nullable: true })
  episodesAmount?: number;

  @Column('simple-array', { array: true, nullable: true })
  authors?: string[];

  @Column('uuid', { nullable: true })
  createdById?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy?: User;

  @Column('varchar', { nullable: true })
  profile?: string;

  @Column('varchar', { nullable: true })
  banner?: string;

  @OneToMany(() => AnimeGenre, genre => genre.anime)
  genres: AnimeGenre[];

  @OneToMany(() => RecentUserAnime, recentUserAnime => recentUserAnime.anime)
  recentUsersAnimes: RecentUserAnime[];

  @OneToMany(
    () => FavoriteUserAnime,
    favoriteUserAnime => favoriteUserAnime.anime,
  )
  favoriteUsersAnimes: FavoriteUserAnime[];

  @OneToMany(() => AnimeCharacter, animeCharacter => animeCharacter.anime)
  animesCharacters: AnimeCharacter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'profileUrl' })
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

  @Expose({ name: 'bannerUrl' })
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
