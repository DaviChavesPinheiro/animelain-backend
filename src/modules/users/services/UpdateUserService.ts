import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IImagesRepository from '@modules/images/repositories/IImagesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
  avatarId?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    old_password,
    password,
    avatarId,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
        throw new AppError('E-mail already in use.');
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (avatarId) {
      const image = await this.imagesRepository.findById(avatarId);

      if (!image) {
        throw new AppError('Avatar Image not found.');
      }

      user.avatarId = avatarId;
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
