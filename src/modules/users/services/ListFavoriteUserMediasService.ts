import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FavoriteUserMedia from '../infra/typeorm/entities/FavoriteUserMedia';
import IFavoriteUsersMediasRepository from '../repositories/IFavoriteUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class ListFavoriteUserMediasService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FavoriteUsersMediasRepository')
    private favoriteUsersMediasRepository: IFavoriteUsersMediasRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<FavoriteUserMedia[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.favoriteUsersMediasRepository.findByUserId(userId);
  }
}
