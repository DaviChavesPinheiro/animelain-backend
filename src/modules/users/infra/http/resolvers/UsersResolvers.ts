/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { classToClass } from 'class-transformer';
import Joi from 'joi';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import IResolvers from '../../../../../@types/IResolvers';
import User from '../../typeorm/entities/User';

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

      const user = await listUserService.execute({ user_id: id });

      return classToClass(user);
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
  },
};

export default resolvers;
