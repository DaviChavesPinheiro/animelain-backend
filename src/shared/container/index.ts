import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import AnimesRepository from '@modules/animes/infra/typeorm/repositories/AnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IAnimeRepository>(
  'AnimesRepository',
  AnimesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
