import { Request, Response, NextFunction } from 'express';
import AppError from '../../../../../shared/errors/AppError';

export default function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  console.log(request.user);
  if (!request.user.isAdmin) {
    throw new AppError('Unauthorized');
  }
  return next();
}
