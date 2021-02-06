import ListUserService from '@modules/users/services/ListUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import CreateUserMediaService from '@modules/users/services/CreateUserMediaService';
import DeleteUserMediaService from '@modules/users/services/DeleteUserMediaService';
import User from '../../typeorm/entities/User';
import {
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from '../schemas/Users.schema';
import {
  CreateUserMediaInput,
  DeleteUserMediaInput,
  FindUsersMediasInput,
} from '../schemas/UsersMedias.schema';
import UserMedia from '../../typeorm/entities/UserMedia';

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

  @Mutation(() => Boolean)
  async sendForgotPasswordEmail(@Arg('email') email: string): Promise<boolean> {
    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmailService.execute({
      email,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(@Arg('data') data: ResetPasswordInput): Promise<boolean> {
    const { password, token } = data;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      password,
      token,
    });

    return true;
  }

  @Mutation(() => UserMedia)
  async createUserMedia(
    @Arg('data') data: CreateUserMediaInput,
  ): Promise<UserMedia> {
    const { mediaId, userId, userMediaStatus } = data;

    const createUserMediaService = container.resolve(CreateUserMediaService);

    const userMedia = await createUserMediaService.execute({
      mediaId,
      userId,
      userMediaStatus,
    });

    return userMedia;
  }

  @Mutation(() => UserMedia)
  async deleteUserMedia(
    @Arg('data') data: DeleteUserMediaInput,
  ): Promise<UserMedia> {
    const { mediaId, userId, userMediaStatus } = data;

    const deleteUserMediaService = container.resolve(DeleteUserMediaService);

    const userMedia = await deleteUserMediaService.execute({
      mediaId,
      userId,
      userMediaStatus,
    });

    return userMedia;
  }

  @FieldResolver()
  async userMedias(
    @Root() user: User,
    @Arg('params') params: FindUsersMediasInput,
  ): Promise<any> {
    return { user, params };
  }
}

export default UsersResolver;
