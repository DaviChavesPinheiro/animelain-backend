import { MaxLength, IsEmail } from 'class-validator';
import { ObjectType, Field, InputType } from 'type-graphql';
import User from '../../typeorm/entities/User';

@ObjectType()
export default class Session {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  @MaxLength(255)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MaxLength(255)
  password: string;
}
