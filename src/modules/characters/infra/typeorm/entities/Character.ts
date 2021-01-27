import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import AnimeCharacter from '@modules/animes/infra/typeorm/entities/AnimeCharacter';

// todo: make character name unique (in service too).
@Entity('characters')
class Character extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('integer', { nullable: true })
  age?: number;

  @Column('varchar', { nullable: true })
  profile?: string;

  @Column('varchar', { nullable: true })
  banner?: string;

  @OneToMany(() => AnimeCharacter, animeCharacter => animeCharacter.character)
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

export default Character;
