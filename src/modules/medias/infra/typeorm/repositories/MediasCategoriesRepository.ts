import ICreateCategoryDTO from '@modules/medias/dtos/ICreateMediaCategoryDTO';
import IFindByIdCategoryDTO from '@modules/medias/dtos/IFindByIdMediaCategoryDTO';
import IFindMediaCategoryDTO from '@modules/medias/dtos/IFindMediaCategoryDTO';
import IMediasCategoriesRepository from '@modules/medias/repositories/IMediasCategoriesRepository';
import { Repository, getRepository } from 'typeorm';
import MediaCategory from '../entities/MediaCategory';

export default class MediasCategoriesRepository
  implements IMediasCategoriesRepository {
  private ormRepository: Repository<MediaCategory>;

  constructor() {
    this.ormRepository = getRepository(MediaCategory);
  }

  public async find({
    mediaId,
    page,
    perPage,
  }: IFindMediaCategoryDTO): Promise<MediaCategory[]> {
    const query = this.ormRepository
      .createQueryBuilder('mediaCategory')
      .where('mediaCategory.mediaId = :mediaId', { mediaId });

    return query
      .take(perPage)
      .skip((page - 1) * perPage)
      .getMany();
  }

  public async count({ mediaId }: IFindMediaCategoryDTO): Promise<number> {
    const query = this.ormRepository
      .createQueryBuilder('mediaCategory')
      .where('mediaCategory.mediaId = :mediaId', { mediaId });

    return query.getCount();
  }

  public async findByMediaIdAndCategoryId({
    mediaId,
    categoryId,
  }: IFindByIdCategoryDTO): Promise<MediaCategory | undefined> {
    const genre = await this.ormRepository.findOne({
      mediaId,
      categoryId,
    });

    return genre;
  }

  public async findById(id: string): Promise<MediaCategory | undefined> {
    const genre = await this.ormRepository.findOne(id);

    return genre;
  }

  public async create({
    mediaId,
    categoryId,
    score,
  }: ICreateCategoryDTO): Promise<MediaCategory> {
    const genre = this.ormRepository.create({
      mediaId,
      categoryId,
      score,
    });

    await this.ormRepository.save(genre);

    return genre;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
