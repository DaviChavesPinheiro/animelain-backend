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
}
