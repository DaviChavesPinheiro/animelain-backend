import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  animeId: string;
}

@injectable()
export default class ToggleFavoriteUserAnimeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('FavoriteUsersAnimesRepository')
    private favoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository,
  ) {}

  public async execute({ userId, animeId }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const favoriteUserAnime = await this.favoriteUsersAnimesRepository.findByUserIdAndAnimeId(
      { animeId, userId },
    );

    if (favoriteUserAnime) {
      await this.favoriteUsersAnimesRepository.deleteById(favoriteUserAnime.id);
      return false;
    }
    await this.favoriteUsersAnimesRepository.create({
      animeId,
      userId,
    });

    return true;
  }
}