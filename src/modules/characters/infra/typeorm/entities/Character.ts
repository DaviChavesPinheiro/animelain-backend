import Anime from '@modules/animes/infra/typeorm/entities/Anime';
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
}

export default Character;
