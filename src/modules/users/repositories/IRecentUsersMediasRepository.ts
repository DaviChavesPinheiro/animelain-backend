import ICreateRecentUserMediaDTO from '../dtos/ICreateRecentUserMediaDTO';
import IFindByIdRecentUserMediaDTO from '../dtos/IFindByIdRecentUserMediaDTO';
import RecentUserMedia from '../infra/typeorm/entities/RecentUserMedia';

export default interface IRecentUsersMediasRepository {
  findByUserId(id: string): Promise<RecentUserMedia[]>;
  findByUserIdAndMediaId(
    data: IFindByIdRecentUserMediaDTO,
  ): Promise<RecentUserMedia | undefined>;
  findById(id: string): Promise<RecentUserMedia | undefined>;
  create(data: ICreateRecentUserMediaDTO): Promise<RecentUserMedia>;
  deleteById(id: string): Promise<RecentUserMedia>;
}
