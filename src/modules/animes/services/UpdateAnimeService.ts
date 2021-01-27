import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';

interface IRequest {
  animeId: string;
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
    animeId,
    title,
    description,
    episodesAmount,
  }: IRequest): Promise<Anime> {
    const anime = await this.animesRepository.findById(animeId);

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

      if (findAnimeWithSameTitle && findAnimeWithSameTitle.id !== animeId) {
        throw new AppError('This anime already exists');
      }

      anime.title = title;
    }

    if (description) {
      anime.description = description;
    }

    if (anime.createdById) {
      await this.notificationsRepository.create({
        target_id: anime.createdById,
        content: `O anime ${anime.title} foi atualizado.`,
      });
    }

    return this.animesRepository.save(anime);
  }
}

export default UpdateAnimeService;
