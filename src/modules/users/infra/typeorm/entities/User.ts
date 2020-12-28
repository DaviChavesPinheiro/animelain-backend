import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('varchar', { nullable: true })
  avatar: string;

  @ManyToMany(() => Anime, anime => anime.favorite_users, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'favorite_animes' })
  favorite_animes: Anime[];

  @Column('boolean', { default: false })
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
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
