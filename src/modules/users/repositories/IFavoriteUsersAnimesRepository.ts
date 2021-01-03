import ICreateFavoriteUserAnimeDTO from '../dtos/ICreateFavoriteUserAnimeDTO';
import IFindByIdFavoriteUserAnimeDTO from '../dtos/IFindByIdFavoriteUserAnimeDTO';
import FavoriteUserAnime from '../infra/typeorm/entities/FavoriteUserAnime';

export default interface IFavoriteUsersAnimesRepository {
  findByUserId(id: string): Promise<FavoriteUserAnime[]>;
  findByUserIdAndAnimeId(
    data: IFindByIdFavoriteUserAnimeDTO,
  ): Promise<FavoriteUserAnime | undefined>;
  findById(id: string): Promise<FavoriteUserAnime | undefined>;
  create(data: ICreateFavoriteUserAnimeDTO): Promise<FavoriteUserAnime>;
  deleteById(id: string): Promise<FavoriteUserAnime>;
}
