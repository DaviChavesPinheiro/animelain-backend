import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Genre from './Genre';

@Entity('animes')
class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('int2', { nullable: false })
  episodesAmount: number;

  @Column('uuid', { nullable: true })
  created_by_id: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'created_by_id' })
  created_by: User;

  @Column('varchar', { nullable: true })
  profile: string;

  @Column('varchar', { nullable: true })
  banner: string;

  @OneToMany(() => Genre, genre => genre.anime, {
    cascade: true,
  })
  genres: Genre[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Anime;
