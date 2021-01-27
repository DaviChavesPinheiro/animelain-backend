import ListUserService from '@modules/users/services/ListUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import User from '../../typeorm/entities/User';
import {
  CreateSessionInput,
  CreateUserInput,
  UpdateUserInput,
} from '../schemas/Users.schema';
import Session from '../schemas/Session.schema';

@Resolver(User)
class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.find();

    return classToClass(users);
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    const listUserService = container.resolve(ListUserService);

    const user = await listUserService.execute({ userId: id });
    return classToClass(user);
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const { name, email, password } = data;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return classToClass(user);
  }

  @Mutation(() => User)
  async updateUser(@Arg('data') data: UpdateUserInput): Promise<User> {
    const { id, name, email } = data;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      name,
      email,
    });

    return classToClass(user);
  }

  @Mutation(() => Session)
  async createSession(@Arg('data') data: CreateSessionInput): Promise<Session> {
    const { email, password } = data;

    const createSessionService = container.resolve(CreateSessionService);

    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    return { user: classToClass(user), token };
  }
}

export default UsersResolver;
