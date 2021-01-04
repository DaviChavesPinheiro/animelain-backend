import Category from '@modules/categories/infra/typeorm/entities/Category';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Anime from './Anime';

@Entity('genres')
class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @Column()
  anime_id?: string;

  @Column()
  category_id?: string;

  @ManyToOne(() => Anime, anime => anime.genres)
  @JoinColumn({ name: 'anime_id' })
  anime: Anime;

  @ManyToOne(() => Category, category => category.genres)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Genre;
