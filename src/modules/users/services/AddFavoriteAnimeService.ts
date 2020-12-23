import Anime from '@modules/animes/infra/typeorm/entities/Anime';
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
  ) {}

  public async execute({ user_id, anime_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const checkIfAnimeIsAlreadyFavorited = user.favorite_animes?.find(
      anime => anime.id === anime_id,
    );

    if (user.favorite_animes === undefined) {
      user.favorite_animes = [];
    }

    if (!checkIfAnimeIsAlreadyFavorited) {
      const anime = new Anime();
      anime.id = anime_id;
      user.favorite_animes = [...user?.favorite_animes, anime];

      this.usersRepository.save(user);
    }
  }
}
