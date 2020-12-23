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

    if (checkIfAnimeIsAlreadyFavorited) {
      user.favorite_animes = user.favorite_animes.filter(
        favorite_anime => favorite_anime.id !== anime_id,
      );

      this.usersRepository.save(user);
    }
  }
}
