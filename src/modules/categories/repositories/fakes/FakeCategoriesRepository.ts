import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { v4 as uuid } from 'uuid';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async find(): Promise<Category[]> {
    return this.categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const categoryWithSameName = this.categories.find(
      category => category.name === name,
    );

    return categoryWithSameName;
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: uuid(),
      name,
    });

    this.categories.push(category);

    return category;
  }

  public async findAllById(ids: string[]): Promise<Category[]> {
    const existentCategories = this.categories.filter(category =>
      ids.includes(category.id),
    );

    return existentCategories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const categoryWithSameId = this.categories.find(
      category => category.id === id,
    );

    return categoryWithSameId;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[findIndex] = category;

    return category;
  }
}
