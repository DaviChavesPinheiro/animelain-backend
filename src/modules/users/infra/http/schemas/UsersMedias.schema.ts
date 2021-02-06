/* eslint-disable import/prefer-default-export */
import { IsUUID } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserMediaStatus } from '../../typeorm/entities/UserMedia';

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
