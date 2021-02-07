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
import ListUsersService from '@modules/users/services/ListUsersService';
import User from '../../typeorm/entities/User';
import {
  CreateUserInput,
  FindUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from '../schemas/User.schema';
import {
  CreateUserMediaInput,
  DeleteUserMediaInput,
  FindUsersMediasInput,
} from '../schemas/UserMedia.schema';
import UserMedia from '../../typeorm/entities/UserMedia';

@Resolver(User)
class UsersResolver {
  @Query(() => [User])
  async users(@Arg('input') input: FindUserInput): Promise<User[]> {
    const { search, page, perPage } = input;

    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute({
      search,
      page,
      perPage,
    });

    return classToClass(users);
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    const listUserService = container.resolve(ListUserService);

    const user = await listUserService.execute({ userId: id });
    return classToClass(user);
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    const { name, email, password } = input;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return classToClass(user);
  }

  @Mutation(() => User)
  async updateUser(@Arg('input') input: UpdateUserInput): Promise<User> {
    const { id, name, email } = input;

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
  async resetPassword(
    @Arg('input') input: ResetPasswordInput,
  ): Promise<boolean> {
    const { password, token } = input;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      password,
      token,
    });

    return true;
  }

  @Mutation(() => UserMedia)
  async createUserMedia(
    @Arg('input') input: CreateUserMediaInput,
  ): Promise<UserMedia> {
    const { mediaId, userId, userMediaStatus } = input;

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
    @Arg('input') input: DeleteUserMediaInput,
  ): Promise<UserMedia> {
    const { mediaId, userId, userMediaStatus } = input;

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
    @Arg('input') input: FindUsersMediasInput,
  ): Promise<any> {
    return { user, input };
  }
}

export default UsersResolver;
