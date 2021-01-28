import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import IEdge from '@shared/infra/http/schemas/Edges.schema';
import { Field, ID, ObjectType } from 'type-graphql';
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

@ObjectType({ implements: [IEdge] })
@Entity('recent_users_animes')
class RecentUserAnime extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('uuid')
  animeId: string;

  @Field(() => String)
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

  @Field(() => Anime)
  node: Anime;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default RecentUserAnime;
