import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import uploadConfig from '@config/upload';

import '../typeorm';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import IContext, { IUserContext } from '../../../@types/IContext';
import schema from './schemas';
import rateLimiter from './middlewares/rateLimiter';

interface ITokenPayload {
  roles?: UserRole[];
  iat: number;
  exp: number;
  sub: string;
}

const server = new ApolloServer({
  schema,
  uploads: {
    maxFileSize: 1024 * 1024 * 5,
    maxFiles: 1,
  },
  formatError: error => {
    console.log(error);
    return {
      ...error,
      extensions: {
        ...error.extensions,
        exception: undefined,
      },
    };
  },
  context: ({ req }) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return {};

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);
      const { roles, sub } = decoded as ITokenPayload;

      const user: IUserContext = { id: sub, roles };
      console.log({ contextUser: { id: sub, roles } });
      const context: IContext = { user };
      return context;
    } catch (error) {
      console.log(error);
      throw new AuthenticationError('Invalid JWT token');
    }
  },
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(rateLimiter);

server.applyMiddleware({ app });

app.listen(3333, () => console.log('Server Running on port 3333'));
