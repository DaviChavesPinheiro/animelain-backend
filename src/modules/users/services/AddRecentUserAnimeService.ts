import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RecentUserAnime from '../infra/typeorm/entities/RecentUserAnime';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  animeId: string;
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
    userId,
    animeId,
  }: IRequest): Promise<RecentUserAnime> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfRecentUserAnimeAlreadyExist = await this.recentUsersAnimesRepository.findByUserIdAndAnimeId(
      { animeId, userId },
    );

    if (checkIfRecentUserAnimeAlreadyExist) {
      throw new AppError('This Recent User Anime already exists');
    }

    const recentUserAnime = await this.recentUsersAnimesRepository.create({
      animeId,
      userId,
    });

    return recentUserAnime;
  }
}
