import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import MediaCharacter from '@modules/medias/infra/typeorm/entities/MediaCharacter';
import INode from '@shared/infra/http/schemas/Node.schema';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import UserCharacter from '@modules/users/infra/typeorm/entities/UserCharacter';

@ObjectType({ implements: [INode] })
@Entity('characters')
class Character extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  coverImage?: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  bannerImage?: string;

  @OneToMany(() => MediaCharacter, mediaCharacter => mediaCharacter.character)
  mediasCharacters: MediaCharacter[];

  @OneToMany(() => UserCharacter, userCharacter => userCharacter.character)
  usersCharacters: UserCharacter[];

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true, name: 'coverImageUrl' })
  @Expose({ name: 'coverImageUrl' })
  getProfileUrl(): string | null {
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
  getBannerUrl(): string | null {
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

export default Character;
