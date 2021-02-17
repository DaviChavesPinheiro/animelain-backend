import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListCategoriesPageInfoService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ search, page, perPage }: IRequest): Promise<PageInfo> {
    const categoriesAmount = await this.categoriesRepository.count({
      search,
      page,
      perPage,
    });

    return {
      total: categoriesAmount,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(categoriesAmount / perPage),
      hasNextPage: page < Math.ceil(categoriesAmount / perPage),
    };
  }
}
