import ICreateCategoryDTO from '@modules/animes/dtos/ICreateAnimeCategoryDTO';
import IFindByIdCategoryDTO from '@modules/animes/dtos/IFindByIdAnimeCategoryDTO';
import ICategoriesRepository from '@modules/animes/repositories/IAnimesCategoriesRepository';
import { Repository, getRepository } from 'typeorm';
import Category from '../entities/AnimeCategory';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByAnimeId(animeId: string): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      animeId,
    });

    return categories;
  }

  public async findByAnimeIdAndCategoryId({
    animeId,
    categoryId,
  }: IFindByIdCategoryDTO): Promise<Category | undefined> {
    const genre = await this.ormRepository.findOne({
      animeId,
      categoryId,
    });

    return genre;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const genre = await this.ormRepository.findOne(id);

    return genre;
  }

  public async create({
    animeId,
    categoryId,
    score,
  }: ICreateCategoryDTO): Promise<Category> {
    const genre = this.ormRepository.create({
      animeId,
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
