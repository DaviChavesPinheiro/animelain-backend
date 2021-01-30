import ICreateCategoryDTO from '@modules/medias/dtos/ICreateMediaCategoryDTO';
import IFindByIdCategoryDTO from '@modules/medias/dtos/IFindByIdMediaCategoryDTO';
import ICategoriesRepository from '@modules/medias/repositories/IMediasCategoriesRepository';
import { Repository, getRepository } from 'typeorm';
import Category from '../entities/MediaCategory';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByMediaId(mediaId: string): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      mediaId,
    });

    return categories;
  }

  public async findByMediaIdAndCategoryId({
    mediaId,
    categoryId,
  }: IFindByIdCategoryDTO): Promise<Category | undefined> {
    const genre = await this.ormRepository.findOne({
      mediaId,
      categoryId,
    });

    return genre;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const genre = await this.ormRepository.findOne(id);

    return genre;
  }

  public async create({
    mediaId,
    categoryId,
    score,
  }: ICreateCategoryDTO): Promise<Category> {
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

export default CategoriesRepository;
