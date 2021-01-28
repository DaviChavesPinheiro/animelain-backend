/* eslint-disable no-shadow */
import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
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

export enum CharacterRole {
  MAIN = 'MAIN',
  SUPPORTING = 'SUPPORTING',
  BACKGROUND = 'BACKGROUND',
}

registerEnumType(CharacterRole, {
  name: 'CharacterRole',
});

@ObjectType()
@Entity('animes_characters')
export default class AnimeCharacter extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => CharacterRole)
  @Column('varchar')
  role: CharacterRole;

  @Field(() => String)
  @Column('uuid')
  animeId: string;

  @Field(() => String)
  @Column('uuid')
  characterId: string;

  @ManyToOne(() => Anime, anime => anime.animesCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @ManyToOne(() => Character, character => character.animesCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'characterId' })
  character: Character;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
