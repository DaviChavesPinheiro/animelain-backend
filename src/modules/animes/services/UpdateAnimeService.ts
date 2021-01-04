import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';

interface IRequest {
  anime_id: string;
  title?: string;
  description?: string;
  episodesAmount?: number;
}

@injectable()
class UpdateAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    anime_id,
    title,
    description,
    episodesAmount,
  }: IRequest): Promise<Anime> {
    const anime = await this.animesRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime not found.');
    }

    if (episodesAmount) {
      if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
        throw new AppError('Episodes cannot be negative');
      }

      anime.episodesAmount = episodesAmount;
    }

    if (title) {
      const findAnimeWithSameTitle = await this.animesRepository.findByTitle(
        title,
      );

      if (findAnimeWithSameTitle && findAnimeWithSameTitle.id !== anime_id) {
        throw new AppError('This anime already exists');
      }

      anime.title = title;
    }

    if (description) {
      anime.description = description;
    }

    // if (genres) {
    //   const categoriesIdsToAdd = genres.map(genre => genre.category.id);

    //   const existentCategories = await this.categoriesRepository.findAllById(
    //     categoriesIdsToAdd,
    //   );

    //   const nonexistentCategoriesIds = categoriesIdsToAdd.filter(
    //     categoryIdToAdd =>
    //       !existentCategories.find(
    //         existentCategory => existentCategory.id === categoryIdToAdd,
    //       ),
    //   );

    //   if (nonexistentCategoriesIds.length) {
    //     throw new AppError(
    //       `The category ${nonexistentCategoriesIds[0]} does not exist`,
    //     );
    //   }

    //   const existentCategoriesIds = existentCategories.map(
    //     category => category.id,
    //   );

    //   const validGenres = genres.filter(genre => {
    //     return existentCategoriesIds.includes(genre.category.id);
    //   });

    //   anime.genres = validGenres.map(genre => {
    //     return Object.assign(new Genre(), {
    //       ...genre,
    //       category: existentCategories.find(
    //         category => category.id === genre.category.id,
    //       ),
    //     });
    //   });
    // }

    // if (characters) {
    //   const charactersIdsToAdd = characters.map(character => character.id);

    //   const existentCharacters = await this.charactersRepository.findAllById(
    //     charactersIdsToAdd,
    //   );

    //   const nonexistentCharactersIds = charactersIdsToAdd.filter(
    //     characterIdToAdd =>
    //       !existentCharacters.find(
    //         existentCharacter => existentCharacter.id === characterIdToAdd,
    //       ),
    //   );

    //   if (nonexistentCharactersIds.length) {
    //     throw new AppError(
    //       `The character ${nonexistentCharactersIds[0]} does not exist`,
    //     );
    //   }

    //   anime.characters = existentCharacters;
    // }

    if (anime.created_by_id) {
      await this.notificationsRepository.create({
        target_id: anime.created_by_id,
        content: `O anime ${anime.title} foi atualizado.`,
      });
    }

    return this.animesRepository.save(anime);
  }
}

export default UpdateAnimeService;
