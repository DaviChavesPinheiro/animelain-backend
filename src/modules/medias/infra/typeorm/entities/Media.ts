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
import RecentUserMedia from '@modules/users/infra/typeorm/entities/RecentUserMedia';
import FavoriteUserMedia from '@modules/users/infra/typeorm/entities/FavoriteUserMedia';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import INode from '@shared/infra/http/schemas/Nodes.schema';
import MediaCategory from './MediaCategory';
import MediaCharacter from './MediaCharacter';
import CharacterConnection from '../../http/schemas/CharacterConnections.schema';
import CategoryConnection from '../../http/schemas/CategoryConnections.schema';

// todo: create recommendations route
// just list some medias based in user favorites

@ObjectType({ implements: [INode] })
@Entity('medias')
class Media extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { length: 255, unique: true })
  title: string;

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
  profile?: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  banner?: string;

  @OneToMany(() => RecentUserMedia, recentUserMedia => recentUserMedia.media)
  recentUsersMedias: RecentUserMedia[];

  @OneToMany(
    () => FavoriteUserMedia,
    favoriteUserMedia => favoriteUserMedia.media,
  )
  favoriteUsersMedias: FavoriteUserMedia[];

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

  @Field(() => String, { nullable: true, name: 'profileUrl' })
  @Expose({ name: 'profileUrl' })
  getProfileUrl(): string | null {
    if (!this.profile) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.profile}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.profile}`;
      default:
        return null;
    }
  }

  @Field(() => String, { nullable: true, name: 'bannerUrl' })
  @Expose({ name: 'bannerUrl' })
  getBannerUrl(): string | null {
    if (!this.banner) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.banner}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.banner}`;
      default:
        return null;
    }
  }
}

export default Media;
