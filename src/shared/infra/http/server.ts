import 'reflect-metadata';
import '@shared/container';

import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '../typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => console.log('Server Running on port 3333'));
