import Anime from '@modules/animes/infra/typeorm/entities/Anime';
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
  password: string;

  @Column('varchar', { nullable: true })
  avatar: string;

  @ManyToMany(() => Anime, anime => anime.favorite_users, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'favorite_animes' })
  favorite_animes: Anime[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
