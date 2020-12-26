import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICharactersRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICharactersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Category | undefined> {
    const character = this.categoriesRepository.findById(id);

    return character;
  }
}
