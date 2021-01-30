import ICreateFavoriteUserMediaDTO from '@modules/users/dtos/ICreateFavoriteUserMediaDTO';
import IFindByIdFavoriteUserMediaDTO from '@modules/users/dtos/IFindByIdFavoriteUserMediaDTO';
import IFavoriteUsersMediasRepository from '@modules/users/repositories/IFavoriteUsersMediasRepository';
import { Repository, getRepository } from 'typeorm';
import FavoriteUserMedia from '../entities/FavoriteUserMedia';

class FavoriteUsersMediasRepository implements IFavoriteUsersMediasRepository {
  private ormRepository: Repository<FavoriteUserMedia>;

  constructor() {
    this.ormRepository = getRepository(FavoriteUserMedia);
  }

  public async findByUserId(userId: string): Promise<FavoriteUserMedia[]> {
    const query = this.ormRepository
      .createQueryBuilder('favoriteUserMedia')
      .where('favoriteUserMedia.userId = :userId', { userId });

    return query.getMany();
  }

  public async findByUserIdAndMediaId({
    userId,
    mediaId,
  }: IFindByIdFavoriteUserMediaDTO): Promise<FavoriteUserMedia | undefined> {
    const favoriteUserMedia = await this.ormRepository.findOne({
      userId,
      mediaId,
    });

    return favoriteUserMedia;
  }

  public async findById(id: string): Promise<FavoriteUserMedia | undefined> {
    const favoriteUserMedia = await this.ormRepository.findOne(id);

    return favoriteUserMedia;
  }

  public async create({
    userId,
    mediaId,
  }: ICreateFavoriteUserMediaDTO): Promise<FavoriteUserMedia> {
    const favoriteUserMedia = this.ormRepository.create({ userId, mediaId });

    await this.ormRepository.save(favoriteUserMedia);

    return favoriteUserMedia;
  }

  public async deleteById(id: string): Promise<FavoriteUserMedia> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const favoriteUserMedia = await this.ormRepository.remove(entityToRemove);

    return favoriteUserMedia;
  }
}

export default FavoriteUsersMediasRepository;
