import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity('characters')
class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('int2', { nullable: true })
  age: number;

  @Column('varchar', { nullable: true })
  profile: string;

  @Column('varchar', { nullable: true })
  banner: string;

  @ManyToMany(() => Anime, anime => anime.characters)
  animes: Anime[];

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
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.profile}`;
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
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.banner}`;
      default:
        return null;
    }
  }
}

export default Character;
