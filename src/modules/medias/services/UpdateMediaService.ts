import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IMediaRepository from '../repositories/IMediasRepository';
import Media, { MediaSeason, MediaType } from '../infra/typeorm/entities/Media';

interface IRequest {
  id: string;
  type?: MediaType;
  title?: string;
  season?: MediaSeason;
  description?: string;
  episodesAmount?: number;
}

@injectable()
class UpdateMediaService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    id,
    type,
    title,
    season,
    description,
    episodesAmount,
  }: IRequest): Promise<Media> {
    const media = await this.mediasRepository.findById(id);

    if (!media) {
      throw new AppError('Media not found.');
    }

    if (type) {
      if (!Object.values(MediaType).includes(type)) {
        throw new AppError('This type does not exist');
      }

      media.type = type;
    }

    if (title) {
      const findMediaWithSameTitle = await this.mediasRepository.findByTitle(
        title,
      );

      if (findMediaWithSameTitle && findMediaWithSameTitle.id !== id) {
        throw new AppError('This media already exists');
      }

      media.title = title;
    }

    if (season) {
      if (!Object.values(MediaSeason).includes(season)) {
        throw new AppError('This season does not exist');
      }

      media.season = season;
    }

    if (episodesAmount) {
      if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
        throw new AppError('Episodes cannot be negative');
      }

      media.episodesAmount = episodesAmount;
    }

    if (description) {
      media.description = description;
    }

    if (media.createdById) {
      await this.notificationsRepository.create({
        target_id: media.createdById,
        content: `O media ${media.title} foi atualizado.`,
      });
    }

    return this.mediasRepository.save(media);
  }
}

export default UpdateMediaService;
