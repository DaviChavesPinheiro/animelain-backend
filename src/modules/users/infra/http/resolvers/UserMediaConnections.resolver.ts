import ListUserMediasService from '@modules/users/services/ListUserMediasService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import ListUserMediasServicePageInfo from '@modules/users/services/ListUserMediasServicePageInfo';
import UserMedia from '../../typeorm/entities/UserMedia';
import User from '../../typeorm/entities/User';
import UserMediaConnections from '../schemas/UserMediaConnection.schema';
import { FindUsersMediasInput } from '../schemas/UserMedia.schema';

interface IRoot {
  user: User;
  input: FindUsersMediasInput;
}

@Resolver(UserMediaConnections)
class UserMediaConnectionsResolver {
  @FieldResolver()
  async edges(@Root() { user, input }: IRoot): Promise<UserMedia[]> {
    const listUserMedias = container.resolve(ListUserMediasService);

    const usersMedias = await listUserMedias.execute({
      userId: user.id,
      userMediaStatus: input.userMediaStatus,
      mediaType: input.mediaType,
      page: input.page,
      perPage: input.perPage,
    });

    return classToClass(usersMedias);
  }

  @FieldResolver(() => PageInfo)
  async pageInfo(@Root() { user, input }: IRoot): Promise<PageInfo> {
    const listUserMediasServicePageInfo = container.resolve(
      ListUserMediasServicePageInfo,
    );

    const userMediasPageInfo = await listUserMediasServicePageInfo.execute({
      userId: user.id,
      userMediaStatus: input.userMediaStatus,
      page: input.page,
      perPage: input.perPage,
    });

    return classToClass(userMediasPageInfo);
  }
}

export default UserMediaConnectionsResolver;
