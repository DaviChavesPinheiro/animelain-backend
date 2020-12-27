import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  anime_id: string;
}

@injectable()
export default class AddFavoriteAnimeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute({ user_id, anime_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfAnimeIsAlreadyFavorited = user.favorite_animes?.find(
      favoriteAnime => favoriteAnime.id === anime_id,
    );

    if (!checkIfAnimeIsAlreadyFavorited) {
      throw new AppError(`This anime is not favorited`);
    }

    user.favorite_animes = user.favorite_animes.filter(
      favoriteAnime => favoriteAnime.id !== anime_id,
    );

    this.usersRepository.save(user);
  }
}
