/* eslint-disable no-shadow */
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import INode from '@shared/infra/http/schemas/Nodes.schema';
import MediaCategory from './MediaCategory';
import MediaCharacter from './MediaCharacter';
import CharacterConnection from '../../http/schemas/CharacterConnections.schema';
import CategoryConnection from '../../http/schemas/CategoryConnections.schema';

export enum MediaType {
  ANIME = 'ANIME',
  MANGA = 'MANGA',
}

registerEnumType(MediaType, {
  name: 'MediaType',
});

export enum MediaSeason {
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
}

registerEnumType(MediaSeason, {
  name: 'MediaSeason',
});

@ObjectType({ implements: [INode] })
@Entity('medias')
class Media extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => MediaType)
  @Column('varchar')
  type: MediaType;

  @Field(() => String)
  @Column('varchar', { length: 255, unique: true })
  title: string;

  @Field(() => MediaSeason, { nullable: true })
  @Column('varchar', { nullable: true })
  season?: MediaSeason;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  episodesAmount?: number;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { array: true, nullable: true })
  authors?: string[];

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  createdById?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy?: User;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  coverImage?: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  bannerImage?: string;

  @OneToMany(() => MediaCategory, mediaCategory => mediaCategory.media)
  mediasCategories: MediaCategory[];

  @OneToMany(() => MediaCharacter, mediaCharacter => mediaCharacter.media)
  mediasCharacters: MediaCharacter[];

  @Field(() => CategoryConnection)
  categories: CategoryConnection;

  @Field(() => CharacterConnection)
  characters: CharacterConnection;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true, name: 'coverImageUrl' })
  @Expose({ name: 'coverImageUrl' })
  getcoverImageUrl(): string | null {
    if (!this.coverImage) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.coverImage}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.coverImage}`;
      default:
        return null;
    }
  }

  @Field(() => String, { nullable: true, name: 'bannerImageUrl' })
  @Expose({ name: 'bannerImageUrl' })
  getbannerImageUrl(): string | null {
    if (!this.bannerImage) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.bannerImage}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.bannerImage}`;
      default:
        return null;
    }
  }
}

export default Media;
