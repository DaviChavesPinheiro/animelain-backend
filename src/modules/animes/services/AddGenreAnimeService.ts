import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Genre from '../infra/typeorm/entities/Genre';
import IGenresRepository from '../repositories/IGenresRepository';

interface IRequest {
  anime_id: string;
  category_id: string;
  score: number;
}

@injectable()
export default class AddGenreAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({
    category_id,
    anime_id,
    score,
  }: IRequest): Promise<Genre> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfGenreAlreadyExist = await this.genresRepository.findByAnimeIdAndCategoryId(
      { anime_id, category_id },
    );

    if (checkIfGenreAlreadyExist) {
      throw new AppError('This Genre already exists');
    }

    const genre = await this.genresRepository.create({
      anime_id,
      category_id,
      score,
    });

    return genre;
  }
}
