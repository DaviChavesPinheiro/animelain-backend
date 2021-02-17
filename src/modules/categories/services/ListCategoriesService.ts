import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    search,
    page,
    perPage,
  }: IRequest): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      search,
      page,
      perPage,
    });

    return categories;
  }
}
