import { getRepository, In, Repository } from 'typeorm';
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

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id },
    });
    return category;
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async findAllById(ids: string[]): Promise<Category[]> {
    const existentCategories = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });

    return existentCategories;
  }

  public async save(data: Category): Promise<Category> {
    return this.ormRepository.save(data);
  }
}
