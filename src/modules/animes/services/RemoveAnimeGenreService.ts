import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Genre from '../infra/typeorm/entities/AnimeGenre';
import IGenresRepository from '../repositories/IGenresRepository';

interface IRequest {
  animeId: string;
  categoryId: string;
}

@injectable()
export default class RemoveAnimeGenreService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({ categoryId, animeId }: IRequest): Promise<Genre> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfGenreAlreadyExist = await this.genresRepository.findByAnimeIdAndCategoryId(
      { animeId, categoryId },
    );

    if (!checkIfGenreAlreadyExist) {
      throw new AppError('This Genre already does not exists');
    }

    await this.genresRepository.deleteById(checkIfGenreAlreadyExist.id);

    return checkIfGenreAlreadyExist;
  }
}
