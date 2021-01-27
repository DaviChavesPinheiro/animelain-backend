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

  @Column('varchar', { nullable: true })
  role?: string;

  @Column('uuid')
  animeId: string;

  @Column('uuid')
  characterId: string;

  @ManyToOne(() => Anime, anime => anime.animesCharacters)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @ManyToOne(() => Character, character => character.animesCharacters)
  @JoinColumn({ name: 'characterId' })
  character: Character;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default AnimeCharacter;
