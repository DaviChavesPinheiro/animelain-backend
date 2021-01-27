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

@Entity('recent_users_animes')
class RecentUserAnime extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  animeId: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => Anime, anime => anime.recentUsersAnimes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @ManyToOne(() => User, user => user.recentUsersAnimes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default RecentUserAnime;
