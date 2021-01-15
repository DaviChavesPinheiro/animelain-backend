import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import AnimeCharacter from '@modules/animes/infra/typeorm/entities/AnimeCharacter';

// todo: make character name unique (in service too).
@Entity('characters')
class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  age?: number;

  @Column()
  profile?: string;

  @Column()
  banner?: string;

  @OneToMany(() => AnimeCharacter, animeCharacter => animeCharacter.character)
  animes_characters: AnimeCharacter[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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

export default Character;
