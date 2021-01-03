import ICreateRecentUserAnimeDTO from '../dtos/ICreateRecentUserAnimeDTO';
import IFindByIdRecentUserAnimeDTO from '../dtos/IFindByIdRecentUserAnimeDTO';
import RecentUserAnime from '../infra/typeorm/entities/RecentUserAnime';

export default interface IRecentUsersAnimesRepository {
  findByUserId(id: string): Promise<RecentUserAnime[]>;
  findByUserIdAndAnimeId(
    data: IFindByIdRecentUserAnimeDTO,
  ): Promise<RecentUserAnime | undefined>;
  findById(id: string): Promise<RecentUserAnime | undefined>;
  create(data: ICreateRecentUserAnimeDTO): Promise<RecentUserAnime>;
  deleteById(id: string): Promise<RecentUserAnime>;
}
