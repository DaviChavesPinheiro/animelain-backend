import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '../../../../../shared/errors/AppError';

interface ITokenPayload {
  isAdmin: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { isAdmin, sub } = decoded as ITokenPayload;

    request.user = { id: sub, isAdmin };
    console.log(decoded);

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token');
  }
}