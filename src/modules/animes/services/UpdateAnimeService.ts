import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';
import Genre from '../infra/typeorm/entities/Genre';

interface ICharacter {
  id: string;
}

interface IGenre {
  id?: string;
  score: number;
  category: {
    id: string;
  };
}

interface IRequest {
  anime_id: string;
  title: string;
  description: string;
  episodesAmount: number;
  genres?: IGenre[];
  characters?: ICharacter[];
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

    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    anime_id,
    title,
    description,
    episodesAmount,
    genres,
    characters,
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

    if (genres) {
      const categoriesIdsToAdd = genres.map(genre => genre.category.id);

      const existentCategories = await this.categoriesRepository.findAllById(
        categoriesIdsToAdd,
      );

      const existentCategoriesIds = existentCategories.map(
        category => category.id,
      );

      const validGenres = genres.filter(genre => {
        return existentCategoriesIds.includes(genre.category.id);
      });

      anime.genres = validGenres.map(genre => {
        const category = new Category();
        category.id = genre.category.id;
        return Object.assign(new Genre(), {
          ...genre,
          category,
        });
      });
    }

    if (characters) {
      const charactersIdsToAdd = characters.map(character => character.id);

      const existentCharacters = await this.charactersRepository.findAllById(
        charactersIdsToAdd,
      );

      anime.characters = existentCharacters;
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
