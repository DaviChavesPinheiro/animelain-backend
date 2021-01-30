import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AnimeCategory from '../infra/typeorm/entities/AnimeCategory';
import IAnimesCategoriesRepository from '../repositories/IAnimesCategoriesRepository';

interface IRequest {
  animeId: string;
  categoryId: string;
}

@injectable()
export default class RemoveAnimeAnimeCategoryService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('AnimesCategoriesRepository')
    private animesCategoriesRepository: IAnimesCategoriesRepository,
  ) {}

  public async execute({
    categoryId,
    animeId,
  }: IRequest): Promise<AnimeCategory> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfAnimeCategoryAlreadyExist = await this.animesCategoriesRepository.findByAnimeIdAndCategoryId(
      { animeId, categoryId },
    );

    if (!checkIfAnimeCategoryAlreadyExist) {
      throw new AppError('This AnimeCategory already does not exists');
    }

    await this.animesCategoriesRepository.deleteById(
      checkIfAnimeCategoryAlreadyExist.id,
    );

    return checkIfAnimeCategoryAlreadyExist;
  }
}
