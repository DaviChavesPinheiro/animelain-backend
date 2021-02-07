/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, Max } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { UserMediaStatus } from '../../typeorm/entities/UserMedia';

@InputType()
export class FindUsersMediasInput {
  @Field(() => UserMediaStatus, { nullable: true })
  userMediaStatus?: UserMediaStatus;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 50 })
  @IsPositive()
  @Max(50)
  perPage: number;
}

@InputType()
export class CreateUserMediaInput {
  @Field(() => String)
  @IsUUID()
  mediaId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => UserMediaStatus)
  userMediaStatus: UserMediaStatus;
}

@InputType()
export class DeleteUserMediaInput {
  @Field(() => String)
  @IsUUID()
  mediaId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => UserMediaStatus)
  userMediaStatus: UserMediaStatus;
}
