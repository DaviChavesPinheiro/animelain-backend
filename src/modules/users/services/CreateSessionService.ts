import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.');
    }

    const token = sign(
      {
        isAdmin: false,
      },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { user, token };
  }
}

export default CreateSessionService;
