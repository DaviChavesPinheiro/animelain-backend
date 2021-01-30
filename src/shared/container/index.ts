import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import AnimesRepository from '@modules/animes/infra/typeorm/repositories/AnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import CharactersRepository from '@modules/characters/infra/typeorm/repositories/CharactersRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';

import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import RecentUsersAnimesRepository from '@modules/users/infra/typeorm/repositories/RecentUsersAnimesRepository';
import IRecentUsersAnimesRepository from '@modules/users/repositories/IRecentUsersAnimesRepository';

import FavoriteUsersAnimesRepository from '@modules/users/infra/typeorm/repositories/FavoriteUsersAnimesRepository';
import IFavoriteUsersAnimesRepository from '@modules/users/repositories/IFavoriteUsersAnimesRepository';

import AnimesCharactersRepository from '@modules/animes/infra/typeorm/repositories/AnimesCharactersRepository';
import IAnimesCharactersRepository from '@modules/animes/repositories/IAnimesCharactersRepository';

import AnimesCategoriesRepository from '@modules/animes/infra/typeorm/repositories/AnimesCategoriesRepository';
import IAnimesCategoriesRepository from '@modules/animes/repositories/IAnimesCategoriesRepository';

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

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ICharactersRepository>(
  'CharactersRepository',
  CharactersRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IRecentUsersAnimesRepository>(
  'RecentUsersAnimesRepository',
  RecentUsersAnimesRepository,
);

container.registerSingleton<IFavoriteUsersAnimesRepository>(
  'FavoriteUsersAnimesRepository',
  FavoriteUsersAnimesRepository,
);

container.registerSingleton<IAnimesCharactersRepository>(
  'AnimesCharactersRepository',
  AnimesCharactersRepository,
);

container.registerSingleton<IAnimesCategoriesRepository>(
  'AnimesCategoriesRepository',
  AnimesCategoriesRepository,
);
