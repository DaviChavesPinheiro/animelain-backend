import ListUserService from '@modules/users/services/ListUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import {
  Arg,
  Authorized,
  Ctx,
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
import ListImageService from '@modules/images/services/ListImageService';
import Image from '@modules/images/infra/typeorm/entities/Image';
import { IAuthCheckerData } from '@shared/infra/http/schemas';
import IContext from '../../../../../@types/IContext';
import User, { UserRole } from '../../typeorm/entities/User';
import {
  CreateUserInput,
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
  @Authorized<IAuthCheckerData>({
    roles: [UserRole.OWNER],
    isOwner: ({ context }) => !!(context.user && context.user.id),
  })
  @Query(() => User)
  async listAuthenticatedUser(@Ctx() ctx: IContext): Promise<User> {
    const listUserService = container.resolve(ListUserService);

    const user = await listUserService.execute({ userId: ctx.user.id });
    return classToClass(user);
  }

  @Query(() => User)
  async user(@Arg('id') id: string): Promise<User> {
    const listUserService = container.resolve(ListUserService);

    const user = await listUserService.execute({ userId: id });
    return classToClass(user);
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    const { name, email, password, avatarId } = input;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      avatarId,
    });

    return classToClass(user);
  }

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.OWNER, UserRole.SUPER_ADMIN],
    isOwner: ({ context, args }) => args.input.id === context.user.id,
  })
  @Mutation(() => User)
  async updateUser(@Arg('input') input: UpdateUserInput): Promise<User> {
    const { id, name, email, avatarId } = input;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      name,
      email,
      avatarId,
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    isOwner: ({ context, args }) => args.input.userId === context.user.id,
  })
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

  @Authorized<IAuthCheckerData>({
    roles: [UserRole.OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    isOwner: ({ context, args }) => args.input.userId === context.user.id,
  })
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

  @FieldResolver({ nullable: true })
  async avatar(@Root() user: User): Promise<Image | undefined> {
    const listImageService = container.resolve(ListImageService);

    if (user.avatarId) {
      const image = await listImageService.execute({
        id: user.avatarId,
      });

      return classToClass(image);
    }
    return undefined;
  }
}

export default UsersResolver;
