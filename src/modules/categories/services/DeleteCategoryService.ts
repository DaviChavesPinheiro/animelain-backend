import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  category_id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_id }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist.');
    }

    await this.categoriesRepository.deleteById(category.id);

    return category;
  }
}

export default DeleteCategoryService;
