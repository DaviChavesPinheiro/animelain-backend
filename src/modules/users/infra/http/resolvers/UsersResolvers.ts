/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { classToClass } from 'class-transformer';
import Joi from 'joi';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import ListFavoriteUserAnimesService from '@modules/users/services/ListFavoriteUserAnimesService';
import ListAnimeService from '@modules/animes/services/ListAnimeService';
import ListRecentUserAnimesService from '@modules/users/services/ListRecentUserAnimesService';
import ToggleFavoriteUserAnimeService from '@modules/users/services/ToggleFavoriteUserAnimeService';
import ToggleRecentUserAnimeService from '@modules/users/services/ToggleRecentUserAnimeService';
import IResolvers from '../../../../../@types/IResolvers';
import User from '../../typeorm/entities/User';
import FavoriteUserAnime from '../../typeorm/entities/FavoriteUserAnime';
import RecentUserAnime from '../../typeorm/entities/RecentUserAnime';

const resolvers: IResolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const users = await User.find();

      return classToClass(users);
    },
    user: async (_, data): Promise<User> => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const listUserService = container.resolve(ListUserService);

      const user = await listUserService.execute({ userId: id });

      return classToClass(user);
    },
  },
  User: {
    favorites: async (parent: User) => {
      return parent;
    },
    recents: async (parent: User) => {
      return parent;
    },
  },
  Favorites: {
    animes: async (parent: User) => {
      return parent;
    },
  },
  Recents: {
    animes: async (parent: User) => {
      return parent;
    },
  },
  FavoriteAnimeConnection: {
    edges: async (parent: User) => {
      const listFavoriteUserAnimes = container.resolve(
        ListFavoriteUserAnimesService,
      );

      const favorite_users_animes = await listFavoriteUserAnimes.execute({
        userId: parent.id,
      });

      return classToClass(favorite_users_animes);
    },
  },
  RecentAnimeConnection: {
    edges: async (parent: User) => {
      const listRecentUserAnimesService = container.resolve(
        ListRecentUserAnimesService,
      );

      const recent_users_animes = await listRecentUserAnimesService.execute({
        userId: parent.id,
      });

      return classToClass(recent_users_animes);
    },
  },
  FavoriteAnimeEdge: {
    node: async (parent: FavoriteUserAnime) => {
      const listAnimesService = container.resolve(ListAnimeService);

      const anime = await listAnimesService.execute({
        id: parent.animeId,
      });

      return classToClass(anime);
    },
  },
  RecentAnimeEdge: {
    node: async (parent: RecentUserAnime) => {
      const listAnimesService = container.resolve(ListAnimeService);

      const anime = await listAnimesService.execute({
        id: parent.animeId,
      });

      return classToClass(anime);
    },
  },
  Mutation: {
    createUser: async (_, { data }): Promise<User> => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          name: Joi.string().max(255).trim(),
          email: Joi.string().max(255).email().trim().lowercase(),
          password: Joi.string().max(255),
        })
        .validate(data);

      const { name, email, password } = data;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({
        name,
        email,
        password,
      });
      console.log(user);
      return classToClass(user);
    },
    updateUser: async (_, { data }): Promise<User> => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().max(255).trim(),
          email: Joi.string().max(255).email().trim().lowercase(),
        })
        .validate(data);

      const { id, name, email } = data;

      const updateUserService = container.resolve(UpdateUserService);

      const user = await updateUserService.execute({ id, name, email });

      return classToClass(user);
    },
    createSession: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          email: Joi.string().max(255).email().trim().lowercase(),
          password: Joi.string().max(255),
        })
        .validate(data);

      const { email, password } = data;

      const createSessionService = container.resolve(CreateSessionService);

      const { user, token } = await createSessionService.execute({
        email,
        password,
      });

      return { user: classToClass(user), token };
    },
    sendForgotPasswordEmail: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          email: Joi.string().max(255).email().trim().lowercase(),
        })
        .validate(data);

      const { email } = data;

      const sendForgotPasswordEmailService = container.resolve(
        SendForgotPasswordEmailService,
      );

      await sendForgotPasswordEmailService.execute({
        email,
      });

      return true;
    },
    resetPassword: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          password: Joi.string().max(255),
          token: Joi.string().uuid(),
        })
        .validate(data);

      const { password, token } = data;

      const resetPasswordService = container.resolve(ResetPasswordService);

      await resetPasswordService.execute({
        password,
        token,
      });

      return true;
    },
    toggleFavoriteAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          animeId: Joi.string().uuid(),
          userId: Joi.string().uuid(),
        })
        .validate(data);

      const { animeId, userId } = data;

      const toggleFavoriteUserAnimeService = container.resolve(
        ToggleFavoriteUserAnimeService,
      );

      const isFavorited = await toggleFavoriteUserAnimeService.execute({
        animeId,
        userId,
      });

      return isFavorited;
    },
    toggleRecentAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          animeId: Joi.string().uuid(),
          userId: Joi.string().uuid(),
        })
        .validate(data);

      const { animeId, userId } = data;

      const toggleRecentUserAnimeService = container.resolve(
        ToggleRecentUserAnimeService,
      );

      const isRecented = await toggleRecentUserAnimeService.execute({
        animeId,
        userId,
      });

      return isRecented;
    },
  },
};

export default resolvers;