import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';

interface IRequest {
  anime_id: string;
  title: string;
  description: string;
  episodesAmount: number;
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

    if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
      throw new AppError('Episodes cannot be negative');
    }

    const findAnimeWithSameTitle = await this.animesRepository.findByTitle(
      title,
    );

    if (findAnimeWithSameTitle && findAnimeWithSameTitle.id !== anime_id) {
      throw new AppError('This anime already exists');
    }

    anime.title = title;
    anime.description = description;
    anime.episodesAmount = episodesAmount;

    this.notificationsRepository.create({
      target_id: anime.created_by_id,
      content: `O anime ${anime.title} foi atualizado.`,
    });

    return this.animesRepository.save(anime);
  }
}

export default UpdateAnimeService;
