import ICreateRecentUserMediaDTO from '@modules/users/dtos/ICreateRecentUserMediaDTO';
import IFindByIdRecentUserMediaDTO from '@modules/users/dtos/IFindByIdRecentUserMediaDTO';
import IRecentUsersMediasRepository from '@modules/users/repositories/IRecentUsersMediasRepository';
import { Repository, getRepository } from 'typeorm';
import RecentUserMedia from '../entities/RecentUserMedia';

class RecentUsersMediasRepository implements IRecentUsersMediasRepository {
  private ormRepository: Repository<RecentUserMedia>;

  constructor() {
    this.ormRepository = getRepository(RecentUserMedia);
  }

  public async findByUserId(userId: string): Promise<RecentUserMedia[]> {
    const query = this.ormRepository
      .createQueryBuilder('recentUserMedia')
      .where('recentUserMedia.userId = :userId', { userId });

    return query.getMany();
  }

  public async findByUserIdAndMediaId({
    userId,
    mediaId,
  }: IFindByIdRecentUserMediaDTO): Promise<RecentUserMedia | undefined> {
    const recentUserMedia = await this.ormRepository.findOne({
      userId,
      mediaId,
    });

    return recentUserMedia;
  }

  public async findById(id: string): Promise<RecentUserMedia | undefined> {
    const recentUserMedia = await this.ormRepository.findOne(id);

    return recentUserMedia;
  }

  public async create({
    userId,
    mediaId,
  }: ICreateRecentUserMediaDTO): Promise<RecentUserMedia> {
    const recentUserMedia = this.ormRepository.create({ userId, mediaId });

    await this.ormRepository.save(recentUserMedia);

    return recentUserMedia;
  }

  public async deleteById(id: string): Promise<RecentUserMedia> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const recentUserMedia = await this.ormRepository.remove(entityToRemove);

    return recentUserMedia;
  }
}

export default RecentUsersMediasRepository;
