import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  categoryId: string;
  name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ categoryId, name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category not found.');
    }

    const findCategoryWithSameName = await this.categoriesRepository.findByName(
      name,
    );

    if (
      findCategoryWithSameName &&
      findCategoryWithSameName.id !== categoryId
    ) {
      throw new AppError('This category already exists');
    }

    category.name = name;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;
