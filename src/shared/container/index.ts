import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import MediasRepository from '@modules/medias/infra/typeorm/repositories/MediasRepository';
import IMediaRepository from '@modules/medias/repositories/IMediasRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ImagesRepository from '@modules/images/infra/typeorm/repositories/ImagesRepository';
import IImagesRepository from '@modules/images/repositories/IImagesRepository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import CharactersRepository from '@modules/characters/infra/typeorm/repositories/CharactersRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';

import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import UsersMediasRepository from '@modules/users/infra/typeorm/repositories/UsersMediasRepository';
import IUsersMediasRepository from '@modules/users/repositories/IUsersMediasRepository';

import UsersCharactersRepository from '@modules/users/infra/typeorm/repositories/UsersCharactersRepository';
import IUsersCharactersRepository from '@modules/users/repositories/IUsersCharactersRepository';

import MediasCharactersRepository from '@modules/medias/infra/typeorm/repositories/MediasCharactersRepository';
import IMediasCharactersRepository from '@modules/medias/repositories/IMediasCharactersRepository';

import MediasCategoriesRepository from '@modules/medias/infra/typeorm/repositories/MediasCategoriesRepository';
import IMediasCategoriesRepository from '@modules/medias/repositories/IMediasCategoriesRepository';

container.registerSingleton<IMediaRepository>(
  'MediasRepository',
  MediasRepository,
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

container.registerSingleton<IUsersMediasRepository>(
  'UsersMediasRepository',
  UsersMediasRepository,
);

container.registerSingleton<IUsersCharactersRepository>(
  'UsersCharactersRepository',
  UsersCharactersRepository,
);

container.registerSingleton<IMediasCharactersRepository>(
  'MediasCharactersRepository',
  MediasCharactersRepository,
);

container.registerSingleton<IMediasCategoriesRepository>(
  'MediasCategoriesRepository',
  MediasCategoriesRepository,
);

container.registerSingleton<IImagesRepository>(
  'ImagesRepository',
  ImagesRepository,
);
