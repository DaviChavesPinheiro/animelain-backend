import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FavoriteUserAnime from '../infra/typeorm/entities/FavoriteUserAnime';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListFavoriteUserAnimesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FavoriteUsersAnimesRepository')
    private favoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<FavoriteUserAnime[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.favoriteUsersAnimesRepository.findByUserId(user_id);
  }
}
