import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findByName(title: string): Promise<Category | undefined>;
  find(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  findAllById(ids: string[]): Promise<Category[]>;
}
