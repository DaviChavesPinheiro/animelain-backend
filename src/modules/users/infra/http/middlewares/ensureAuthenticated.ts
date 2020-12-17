import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
// import AppError from '../../../../../shared/errors/AppError';

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
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, 'rsetdrygujiokodasdsadasdsadasdsad');
    const { isAdmin, sub } = decoded as ITokenPayload;

    request.user = { id: sub, isAdmin };
    console.log(decoded);

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}
