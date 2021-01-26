import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import User from './User';

@Entity('favorite_users_animes')
class FavoriteUserAnime extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  anime_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Anime, anime => anime.favorite_users_animes)
  @JoinColumn({ name: 'anime_id' })
  anime: Anime;

  @ManyToOne(() => User, user => user.favorite_users_animes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FavoriteUserAnime;
