import ICreateRecentUserAnimeDTO from '@modules/users/dtos/ICreateRecentUserAnimeDTO';
import IFindByIdRecentUserAnimeDTO from '@modules/users/dtos/IFindByIdRecentUserAnimeDTO';
import IRecentUsersAnimesRepository from '@modules/users/repositories/IRecentUsersAnimesRepository';
import { Repository, getRepository } from 'typeorm';
import RecentUserAnime from '../entities/RecentUserAnime';

class RecentUsersAnimesRepository implements IRecentUsersAnimesRepository {
  private ormRepository: Repository<RecentUserAnime>;

  constructor() {
    this.ormRepository = getRepository(RecentUserAnime);
  }

  public async findByUserId(userId: string): Promise<RecentUserAnime[]> {
    const query = this.ormRepository
      .createQueryBuilder('recentUserAnime')
      .where('recentUserAnime.userId = :userId', { userId });

    return query.getMany();
  }

  public async findByUserIdAndAnimeId({
    userId,
    animeId,
  }: IFindByIdRecentUserAnimeDTO): Promise<RecentUserAnime | undefined> {
    const recentUserAnime = await this.ormRepository.findOne({
      userId,
      animeId,
    });

    return recentUserAnime;
  }

  public async findById(id: string): Promise<RecentUserAnime | undefined> {
    const recentUserAnime = await this.ormRepository.findOne(id);

    return recentUserAnime;
  }

  public async create({
    userId,
    animeId,
  }: ICreateRecentUserAnimeDTO): Promise<RecentUserAnime> {
    const recentUserAnime = this.ormRepository.create({ userId, animeId });

    await this.ormRepository.save(recentUserAnime);

    return recentUserAnime;
  }

  public async deleteById(id: string): Promise<RecentUserAnime> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const recentUserAnime = await this.ormRepository.remove(entityToRemove);

    return recentUserAnime;
  }
}

export default RecentUsersAnimesRepository;
