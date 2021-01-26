import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  anime_id: string;
}

@injectable()
export default class ToggleRecentUserAnimeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('RecentUsersAnimesRepository')
    private recentUsersAnimesRepository: IRecentUsersAnimesRepository,
  ) {}

  public async execute({ user_id, anime_id }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const recentUserAnime = await this.recentUsersAnimesRepository.findByUserIdAndAnimeId(
      { anime_id, user_id },
    );

    if (recentUserAnime) {
      await this.recentUsersAnimesRepository.deleteById(recentUserAnime.id);

      return false;
    }

    await this.recentUsersAnimesRepository.create({
      anime_id,
      user_id,
    });

    return true;
  }
}
