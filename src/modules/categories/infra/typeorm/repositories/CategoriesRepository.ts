import { getRepository, Repository } from 'typeorm';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async find(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findedCategory = await this.ormRepository.findOne({
      where: { name },
    });

    return findedCategory;
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(category);

    return category;
  }
}
