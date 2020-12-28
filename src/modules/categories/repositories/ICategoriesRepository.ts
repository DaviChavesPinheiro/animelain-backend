import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IFindCategoryDTO from '../dtos/IFindCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findByName(title: string): Promise<Category | undefined>;
  find(data: IFindCategoryDTO): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(data: Category): Promise<Category>;
  findAllById(ids: string[]): Promise<Category[]>;
  deleteById(id: string): Promise<void>;
}
