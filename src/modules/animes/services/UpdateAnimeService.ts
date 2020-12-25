import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Genre from '../infra/typeorm/entities/Genre';
import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IGenre {
  score: number;
  category_id: string;
}

interface IRequest {
  anime_id: string;
  title: string;
  description: string;
  episodesAmount: number;
  genres?: IGenre[];
}

@injectable()
class UpdateAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    anime_id,
    title,
    description,
    episodesAmount,
    genres,
  }: IRequest): Promise<Anime> {
    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime not found.');
    }

    if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
      throw new AppError('Episodes cannot be negative');
    }

    const findAnimeWithSameTitle = await this.animesRepository.findByTitle(
      title,
    );

    if (findAnimeWithSameTitle && findAnimeWithSameTitle.id !== anime_id) {
      throw new AppError('This anime already exists');
    }

    if(genres) {
      const categoriesIdsToUpdate = genres.map(genre => genre.category_id);

      const existentCategories = await this.categoriesRepository.findAllById(categoriesIdsToUpdate);

      const existentCategoriesIds = existentCategories.map(category => category.id);

      const checkInexistentCategoriesIds = categoriesIdsToUpdate.filter(
        id => !existentCategoriesIds.includes(id),
      );

      if (checkInexistentCategoriesIds.length) {
        throw new AppError(
          `Could not find category ${checkInexistentCategoriesIds[0]}`,
        );
      }

      anime.genres = genres.map(genre => {
        const genreToAdd = new Genre();
        const categoryToAdd = new Category();
        categoryToAdd.id = genre.category_id
        Object.assign(genreToAdd, {
          score: genre.score,
          category: categoryToAdd,
        })

        return genreToAdd;
      })
    }

    anime.title = title;
    anime.description = description;
    anime.episodesAmount = episodesAmount;

    await this.notificationsRepository.create({
      target_id: anime.created_by_id,
      content: `O anime ${anime.title} foi atualizado.`,
    });

    return this.animesRepository.save(anime);
  }
}

export default UpdateAnimeService;
