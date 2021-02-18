import ListUserCharactersService from '@modules/users/services/ListUserCharactersService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import ListUserCharactersServicePageInfo from '@modules/users/services/ListUserCharactersPageInfoService';
import UserCharacter from '../../typeorm/entities/UserCharacter';
import User from '../../typeorm/entities/User';
import UserCharacterConnections from '../schemas/UserCharacterConnection.schema';
import { FindUsersCharactersInput } from '../schemas/UserCharacter.schema';

interface IRoot {
  user: User;
  input: FindUsersCharactersInput;
}

@Resolver(UserCharacterConnections)
class UserCharacterConnectionsResolver {
  @FieldResolver()
  async edges(@Root() { user, input }: IRoot): Promise<UserCharacter[]> {
    const listUserCharacters = container.resolve(ListUserCharactersService);

    const usersCharacters = await listUserCharacters.execute({
      userId: user.id,
      userCharacterStatus: input.userCharacterStatus,
      page: input.page,
      perPage: input.perPage,
    });

    return classToClass(usersCharacters);
  }

  @FieldResolver(() => PageInfo)
  async pageInfo(@Root() { user, input }: IRoot): Promise<PageInfo> {
    const listUserCharactersServicePageInfo = container.resolve(
      ListUserCharactersServicePageInfo,
    );

    const userCharactersPageInfo = await listUserCharactersServicePageInfo.execute(
      {
        userId: user.id,
        userCharacterStatus: input.userCharacterStatus,
        page: input.page,
        perPage: input.perPage,
      },
    );

    return classToClass(userCharactersPageInfo);
  }
}

export default UserCharacterConnectionsResolver;
