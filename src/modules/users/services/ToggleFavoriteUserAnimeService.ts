import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  anime_id: string;
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

  public async execute({ user_id, anime_id }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const favoriteUserAnime = await this.favoriteUsersAnimesRepository.findByUserIdAndAnimeId(
      { anime_id, user_id },
    );

    if (favoriteUserAnime) {
      await this.favoriteUsersAnimesRepository.deleteById(favoriteUserAnime.id);
      return false;
    }
    await this.favoriteUsersAnimesRepository.create({
      anime_id,
      user_id,
    });

    return true;
  }
}
