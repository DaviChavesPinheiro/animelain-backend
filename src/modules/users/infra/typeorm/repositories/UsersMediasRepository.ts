import ICreateUserMediaDTO from '@modules/users/dtos/ICreateUserMediaDTO';
import IFindOneUserMediaDTO from '@modules/users/dtos/IFindOneUserMediaDTO';
import IFindUserMediaDTO from '@modules/users/dtos/IFindUserMediaDTO';
import IUsersMediasRepository from '@modules/users/repositories/IUsersMediasRepository';
import { Repository, getRepository } from 'typeorm';
import UserMedia from '../entities/UserMedia';

class UsersMediasRepository implements IUsersMediasRepository {
  private ormRepository: Repository<UserMedia>;

  constructor() {
    this.ormRepository = getRepository(UserMedia);
  }

  public async findByUserId(userId: string): Promise<UserMedia[]> {
    const query = this.ormRepository
      .createQueryBuilder('userMedia')
      .where('userMedia.userId = :userId', { userId });

    return query.getMany();
  }

  public async findById(id: string): Promise<UserMedia | undefined> {
    const userMedia = await this.ormRepository.findOne(id);

    return userMedia;
  }

  public async findOne({
    userId,
    mediaId,
    userMediaStatus,
  }: IFindOneUserMediaDTO): Promise<UserMedia | undefined> {
    const userMedia = await this.ormRepository.findOne({
      userId,
      mediaId,
      userMediaStatus,
    });

    return userMedia;
  }

  public async find({
    userId,
    userMediaStatus,
  }: IFindUserMediaDTO): Promise<UserMedia[]> {
    let query = this.ormRepository
      .createQueryBuilder('media')
      .where('media.userId = :userId', { userId });

    if (userMediaStatus) {
      query = query.andWhere('media.userMediaStatus = :userMediaStatus', {
        userMediaStatus,
      });
    }

    return query.getMany();
  }

  public async count({
    userId,
    userMediaStatus,
  }: IFindUserMediaDTO): Promise<number> {
    let query = this.ormRepository
      .createQueryBuilder('media')
      .where('media.userId = :userId', { userId });

    if (userMediaStatus) {
      query = query.andWhere('media.userMediaStatus = :userMediaStatus', {
        userMediaStatus,
      });
    }

    return query.getCount();
  }

  public async create({
    userId,
    mediaId,
    userMediaStatus,
  }: ICreateUserMediaDTO): Promise<UserMedia> {
    const userMedia = this.ormRepository.create({
      userId,
      mediaId,
      userMediaStatus,
    });

    await this.ormRepository.save(userMedia);

    return userMedia;
  }

  public async deleteById(id: string): Promise<UserMedia> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const userMedia = await this.ormRepository.remove(entityToRemove);

    return userMedia;
  }
}

export default UsersMediasRepository;
