/* eslint-disable no-shadow */
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import INode from '@shared/infra/http/schemas/Node.schema';
import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';

export enum ImageType {
  AVATAR = 'AVATAR',
  COVER = 'COVER',
  BANNER = 'BANNER',
}

registerEnumType(ImageType, {
  name: 'ImageType',
});

@ObjectType({ implements: [INode] })
@Entity('images')
class Image extends BaseEntity implements INode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  fileName: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  width?: number;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  height?: number;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  mimeType?: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  encoding?: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  size?: number;

  @Field(() => ImageType, { nullable: true })
  @Column('varchar', { nullable: true })
  type?: ImageType;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { name: 'url' })
  @Expose({ name: 'url' })
  getUrl(): string {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_WEB_API}/files/uploads/${this.fileName}`;
      case 's3':
        return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.fileName}`;
      default:
        return 'error';
    }
  }
}

export default Image;
