import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<IRequest> {
    const categoryWithSameName = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryWithSameName) {
      throw new AppError('This category already exists');
    }

    const category = await this.categoriesRepository.create({
      name,
    });

    return category;
  }
}
