import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FavoriteUserAnime from '../infra/typeorm/entities/FavoriteUserAnime';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  anime_id: string;
}

@injectable()
export default class RemoveFavoriteUserAnimeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('FavoriteUsersAnimesRepository')
    private favoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository,
  ) {}

  public async execute({
    user_id,
    anime_id,
  }: IRequest): Promise<FavoriteUserAnime> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById({ id: anime_id });

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfFavoriteUserAnimeAlreadyExist = await this.favoriteUsersAnimesRepository.findByUserIdAndAnimeId(
      { anime_id, user_id },
    );

    if (!checkIfFavoriteUserAnimeAlreadyExist) {
      throw new AppError('This Favorite User Anime does not exists');
    }

    const favoriteUserAnime = await this.favoriteUsersAnimesRepository.deleteById(
      checkIfFavoriteUserAnimeAlreadyExist.id,
    );

    return favoriteUserAnime;
  }
}
