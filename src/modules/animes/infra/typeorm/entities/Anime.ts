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
import RecentUserAnime from '@modules/users/infra/typeorm/entities/RecentUserAnime';
import FavoriteUserAnime from '@modules/users/infra/typeorm/entities/FavoriteUserAnime';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import INode from '@shared/infra/http/schemas/Nodes.schema';
import AnimeCategory from './AnimeCategory';
import AnimeCharacter from './AnimeCharacter';
import CharacterConnection from '../../http/schemas/CharacterConnections.schema';
import CategoryConnection from '../../http/schemas/CategoryConnections.schema';

// todo: create recommendations route
// just list some animes based in user favorites

@ObjectType({ implements: [INode] })
@Entity('animes')
class Anime extends BaseEntity implements INode {
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

  @OneToMany(() => RecentUserAnime, recentUserAnime => recentUserAnime.anime)
  recentUsersAnimes: RecentUserAnime[];

  @OneToMany(
    () => FavoriteUserAnime,
    favoriteUserAnime => favoriteUserAnime.anime,
  )
  favoriteUsersAnimes: FavoriteUserAnime[];

  @OneToMany(() => AnimeCategory, animeCategory => animeCategory.anime)
  animesCategories: AnimeCategory[];

  @OneToMany(() => AnimeCharacter, animeCharacter => animeCharacter.anime)
  animesCharacters: AnimeCharacter[];

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

export default Anime;
