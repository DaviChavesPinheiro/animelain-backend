/* eslint-disable no-shadow */
import Media from '@modules/medias/infra/typeorm/entities/Media';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import IEdge from '@shared/infra/http/schemas/Edges.schema';
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

@ObjectType({ implements: [IEdge] })
@Entity('medias_characters')
export default class MediaCharacter extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => CharacterRole)
  @Column('varchar')
  role: CharacterRole;

  @Field(() => String)
  @Column('uuid')
  mediaId: string;

  @Field(() => String)
  @Column('uuid')
  characterId: string;

  @ManyToOne(() => Media, media => media.mediasCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'mediaId' })
  media: Media;

  @ManyToOne(() => Character, character => character.mediasCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'characterId' })
  character: Character;

  @Field(() => Character)
  node: Character;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
