import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findByName(title: string): Promise<Category | undefined>;
  find(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(data: Category): Promise<Category>;
  findAllById(ids: string[]): Promise<Category[]>;
}
