import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListFavoriteAnimesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Anime[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.animesRepository.findFavoritesByUserId(user_id);
  }
}
