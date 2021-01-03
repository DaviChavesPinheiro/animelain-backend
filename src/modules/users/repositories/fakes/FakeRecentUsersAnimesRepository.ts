import ICreateRecentUserAnimeDTO from '@modules/users/dtos/ICreateRecentUserAnimeDTO';
import IFindByIdRecentUserAnimeDTO from '@modules/users/dtos/IFindByIdRecentUserAnimeDTO';
import RecentUserAnime from '@modules/users/infra/typeorm/entities/RecentUserAnime';
import { v4 as uuid } from 'uuid';
import IRecentUsersAnimesRepository from '../IRecentUsersAnimesRepository';

export default class FakeRecentUsersAnimesRepository
  implements IRecentUsersAnimesRepository {
  private recentUsersAnimes: RecentUserAnime[] = [];

  public async findByUserId(user_id: string): Promise<RecentUserAnime[]> {
    return this.recentUsersAnimes.filter(
      recentUserAnime => recentUserAnime.user_id === user_id,
    );
  }

  public async deleteById(id: string): Promise<RecentUserAnime> {
    const recentUserAnimeToRemove = this.recentUsersAnimes.find(
      rencentUserAnime => rencentUserAnime.id === id,
    ) as RecentUserAnime;

    this.recentUsersAnimes = this.recentUsersAnimes.filter(
      rencentUserAnime => rencentUserAnime.id === id,
    );

    return recentUserAnimeToRemove;
  }

  public async findById(id: string): Promise<RecentUserAnime | undefined> {
    const findRecentUserAnime = this.recentUsersAnimes.find(
      user => user.id === id,
    );

    return findRecentUserAnime;
  }

  public async findByUserIdAndAnimeId({
    user_id,
    anime_id,
  }: IFindByIdRecentUserAnimeDTO): Promise<RecentUserAnime | undefined> {
    return this.recentUsersAnimes.find(
      recentUserAnime =>
        recentUserAnime.user_id === user_id &&
        recentUserAnime.anime_id === anime_id,
    );
  }

  public async create({
    anime_id,
    user_id,
  }: ICreateRecentUserAnimeDTO): Promise<RecentUserAnime> {
    const recentUserAnime = new RecentUserAnime();

    recentUserAnime.id = uuid();
    recentUserAnime.anime_id = anime_id;
    recentUserAnime.user_id = user_id;
    recentUserAnime.created_at = new Date();
    recentUserAnime.updated_at = new Date();

    this.recentUsersAnimes.push(recentUserAnime);

    return recentUserAnime;
  }
}
