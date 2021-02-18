/* eslint-disable import/prefer-default-export */
import { IsPositive, IsUUID, Max } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { UserCharacterStatus } from '../../typeorm/entities/UserCharacter';

@InputType()
export class FindUsersCharactersInput {
  @Field(() => UserCharacterStatus, { nullable: true })
  userCharacterStatus?: UserCharacterStatus;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  page: number;

  @Field(() => Int, { defaultValue: 50 })
  @IsPositive()
  @Max(50)
  perPage: number;
}

@InputType()
export class CreateUserCharacterInput {
  @Field(() => String)
  @IsUUID()
  characterId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => UserCharacterStatus)
  userCharacterStatus: UserCharacterStatus;
}

@InputType()
export class DeleteUserCharacterInput {
  @Field(() => String)
  @IsUUID()
  characterId: string;

  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => UserCharacterStatus)
  userCharacterStatus: UserCharacterStatus;
}
