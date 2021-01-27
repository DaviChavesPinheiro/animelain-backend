import Category from '@modules/categories/infra/typeorm/entities/Category';
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
import Anime from './Anime';

@Entity('animes_genres')
class AnimeGenre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { nullable: true })
  score?: number;

  @Column('uuid')
  animeId: string;

  @Column('uuid')
  categoryId: string;

  @ManyToOne(() => Anime, anime => anime.genres)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @ManyToOne(() => Category, category => category.genres)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default AnimeGenre;
