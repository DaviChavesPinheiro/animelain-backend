import ListUserMediasService from '@modules/users/services/ListUserMediasService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import UserMedia from '../../typeorm/entities/UserMedia';
import User from '../../typeorm/entities/User';
import UserMediaConnections from '../schemas/UserMediaConnections.schema';
import { FindUsersMediasInput } from '../schemas/UsersMedias.schema';

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
    });

    return classToClass(usersMedias);
  }
}

export default UserMediaConnectionsResolver;
