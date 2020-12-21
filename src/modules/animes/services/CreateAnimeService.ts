import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import Genre from '../infra/typeorm/entities/Genre';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IGenre {
  score: number;
  category_id: string;
}

interface IRequest {
  title: string;
  description: string;
  episodesAmount: number;
  created_by_id: string;
  genres: IGenre[];
}

@injectable()
export default class CreateAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    title,
    description,
    episodesAmount,
    created_by_id,
    genres,
  }: IRequest): Promise<Anime> {
    if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
      throw new AppError('Episodes cannot be negative');
    }

    const findAnimeWithSameTitle = await this.animesRepository.findByTitle(
      title,
    );

    if (findAnimeWithSameTitle) {
      throw new AppError('This anime already exists');
    }

    const categoriesIds = genres.map(genre => genre.category_id);

    const existentCategories = await this.categoriesRepository.findAllById(
      categoriesIds,
    );

    const existentCategoriesIds = existentCategories.map(
      category => category.id,
    );

    const checkInexistentCategories = genres.filter(
      genre => !existentCategoriesIds.includes(genre.category_id),
    );

    if (checkInexistentCategories.length) {
      throw new AppError(
        `Could not find category ${checkInexistentCategories[0].category_id}`,
      );
    }

    const genresObjects = genres.map(genre => {
      const genreObject = new Genre();
      Object.assign(genreObject, {
        score: genre.score,
        category_id: genre.category_id,
      });

      return genreObject;
    });

    const anime = await this.animesRepository.create({
      title,
      description,
      episodesAmount,
      created_by_id,
      genres: genresObjects,
    });

    return anime;
  }
}
