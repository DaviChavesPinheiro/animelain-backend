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

@Entity('animes_categories')
class AnimesCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, category => category.animes_categories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Anime, anime => anime.animes_categories)
  @JoinColumn({ name: 'anime_id' })
  anime: Anime;

  @Column()
  anime_id: string;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AnimesCategories;
