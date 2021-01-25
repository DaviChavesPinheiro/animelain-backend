import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import Character from '@modules/characters/infra/typeorm/entities/Character';
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

@Entity('animes_characters')
class AnimeCharacter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role?: string;

  @Column()
  anime_id?: string;

  @Column()
  character_id?: string;

  @ManyToOne(() => Anime, anime => anime.animes_characters)
  @JoinColumn({ name: 'anime_id' })
  anime: Anime;

  @ManyToOne(() => Character, character => character.animes_characters)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AnimeCharacter;
