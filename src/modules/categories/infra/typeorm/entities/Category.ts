import AnimesCategories from '@modules/animes/infra/typeorm/entities/AnimesCategories';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => AnimesCategories,
    animes_categories => animes_categories.category,
    {
      cascade: true,
    },
  )
  animes_categories: AnimesCategories[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
