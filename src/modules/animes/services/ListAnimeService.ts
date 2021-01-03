import IFavoriteUsersAnimesRepository from '@modules/users/repositories/IFavoriteUsersAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  id: string;
  user_id?: string;
}

@injectable()
export default class ListAnimesService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('FavoriteUsersAnimesRepository')
    private favoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Anime | undefined> {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new AppError('This anime does not exist');
    }

    if (user_id) {
      const favoriteUserAnime = await this.favoriteUsersAnimesRepository.findByUserIdAndAnimeId(
        {
          anime_id: anime.id,
          user_id,
        },
      );
      anime.isFavorited = !!favoriteUserAnime;
    }

    return anime;
  }
}
