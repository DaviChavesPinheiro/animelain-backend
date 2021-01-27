import { ObjectType, Field } from 'type-graphql';
import User from '../../typeorm/entities/User';

@ObjectType()
class Session {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}

export default Session;
