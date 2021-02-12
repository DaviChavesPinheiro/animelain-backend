import IImagesRepository from '@modules/images/repositories/IImagesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User, { UserRole } from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatarId?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    avatarId,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already taken');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (avatarId) {
      const image = await this.imagesRepository.findById(avatarId);

      if (!image) {
        throw new AppError('Avatar Image not found.');
      }
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatarId,
    });

    return user;
  }
}
