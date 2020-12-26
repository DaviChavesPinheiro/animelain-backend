import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  search?: string;
}

@injectable()
export default class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<Category[]> {
    const categories = this.categoriesRepository.find({
      search,
    });

    return categories;
  }
}
