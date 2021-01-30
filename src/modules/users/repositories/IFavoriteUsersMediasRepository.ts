import ICreateFavoriteUserMediaDTO from '../dtos/ICreateFavoriteUserMediaDTO';
import IFindByIdFavoriteUserMediaDTO from '../dtos/IFindByIdFavoriteUserMediaDTO';
import FavoriteUserMedia from '../infra/typeorm/entities/FavoriteUserMedia';

export default interface IFavoriteUsersMediasRepository {
  findByUserId(id: string): Promise<FavoriteUserMedia[]>;
  findByUserIdAndMediaId(
    data: IFindByIdFavoriteUserMediaDTO,
  ): Promise<FavoriteUserMedia | undefined>;
  findById(id: string): Promise<FavoriteUserMedia | undefined>;
  create(data: ICreateFavoriteUserMediaDTO): Promise<FavoriteUserMedia>;
  deleteById(id: string): Promise<FavoriteUserMedia>;
}
