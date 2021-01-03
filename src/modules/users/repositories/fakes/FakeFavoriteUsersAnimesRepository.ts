import ICreateFavoriteUserAnimeDTO from '@modules/users/dtos/ICreateFavoriteUserAnimeDTO';
import IFindByIdFavoriteUserAnimeDTO from '@modules/users/dtos/IFindByIdFavoriteUserAnimeDTO';
import FavoriteUserAnime from '@modules/users/infra/typeorm/entities/FavoriteUserAnime';
import { v4 as uuid } from 'uuid';
import IFavoriteUsersAnimesRepository from '../IFavoriteUsersAnimesRepository';

export default class FakeFavoriteUsersAnimesRepository
  implements IFavoriteUsersAnimesRepository {
  private favoriteUsersAnimes: FavoriteUserAnime[] = [];

  public async findByUserId(user_id: string): Promise<FavoriteUserAnime[]> {
    return this.favoriteUsersAnimes.filter(
      favoriteUserAnime => favoriteUserAnime.user_id === user_id,
    );
  }

  public async deleteById(id: string): Promise<FavoriteUserAnime> {
    const favoriteUserAnimeToRemove = this.favoriteUsersAnimes.find(
      favoriteUserAnime => favoriteUserAnime.id === id,
    ) as FavoriteUserAnime;

    this.favoriteUsersAnimes = this.favoriteUsersAnimes.filter(
      favoriteUserAnime => favoriteUserAnime.id === id,
    );

    return favoriteUserAnimeToRemove;
  }

  public async findById(id: string): Promise<FavoriteUserAnime | undefined> {
    const findFavoriteUserAnime = this.favoriteUsersAnimes.find(
      user => user.id === id,
    );

    return findFavoriteUserAnime;
  }

  public async findByUserIdAndAnimeId({
    user_id,
    anime_id,
  }: IFindByIdFavoriteUserAnimeDTO): Promise<FavoriteUserAnime | undefined> {
    return this.favoriteUsersAnimes.find(
      favoriteUserAnime =>
        favoriteUserAnime.user_id === user_id &&
        favoriteUserAnime.anime_id === anime_id,
    );
  }

  public async create({
    anime_id,
    user_id,
  }: ICreateFavoriteUserAnimeDTO): Promise<FavoriteUserAnime> {
    const favoriteUserAnime = new FavoriteUserAnime();

    favoriteUserAnime.id = uuid();
    favoriteUserAnime.anime_id = anime_id;
    favoriteUserAnime.user_id = user_id;
    favoriteUserAnime.created_at = new Date();
    favoriteUserAnime.updated_at = new Date();

    this.favoriteUsersAnimes.push(favoriteUserAnime);

    return favoriteUserAnime;
  }
}
