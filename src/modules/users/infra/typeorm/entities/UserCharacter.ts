/* eslint-disable no-shadow */
import Character from '@modules/characters/infra/typeorm/entities/Character';
import IEdge from '@shared/infra/http/schemas/Edge.schema';
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
import User from './User';

export enum UserCharacterStatus {
  FAVORITE = 'FAVORITE',
  FOLLOW = 'FOLLOW',
  HATE = 'HATE',
}

registerEnumType(UserCharacterStatus, {
  name: 'UserCharacterStatus',
});

@ObjectType({ implements: [IEdge] })
@Entity('users_characters')
class UserCharacter extends BaseEntity implements IEdge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('uuid')
  characterId: string;

  @Field(() => String)
  @Column('uuid')
  userId: string;

  @Field(() => UserCharacterStatus)
  @Column('varchar')
  userCharacterStatus: UserCharacterStatus;

  @ManyToOne(() => Character, character => character.usersCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'characterId' })
  character: Character;

  @ManyToOne(() => User, user => user.usersCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Character)
  node: Character;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default UserCharacter;
