import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RecentUserAnime from '../infra/typeorm/entities/RecentUserAnime';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  anime_id: string;
}

@injectable()
export default class AddRecentUserAnimeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('RecentUsersAnimesRepository')
    private recentUsersAnimesRepository: IRecentUsersAnimesRepository,
  ) {}

  public async execute({
    user_id,
    anime_id,
  }: IRequest): Promise<RecentUserAnime> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfRecentUserAnimeAlreadyExist = await this.recentUsersAnimesRepository.findByUserIdAndAnimeId(
      { anime_id, user_id },
    );

    if (checkIfRecentUserAnimeAlreadyExist) {
      throw new AppError('This Recent User Anime already exists');
    }

    const recentUserAnime = await this.recentUsersAnimesRepository.create({
      anime_id,
      user_id,
    });

    return recentUserAnime;
  }
}
