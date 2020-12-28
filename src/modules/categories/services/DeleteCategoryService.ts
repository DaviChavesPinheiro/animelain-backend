import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  category_id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_id }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist.');
    }

    await this.categoriesRepository.deleteById(category.id);
  }
}

export default DeleteCategoryService;
