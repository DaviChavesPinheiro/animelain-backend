import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IMediaRepository from '../repositories/IMediasRepository';
import Media from '../infra/typeorm/entities/Media';

interface IRequest {
  mediaId: string;
  title?: string;
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
    mediaId,
    title,
    description,
    episodesAmount,
  }: IRequest): Promise<Media> {
    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media not found.');
    }

    if (episodesAmount) {
      if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
        throw new AppError('Episodes cannot be negative');
      }

      media.episodesAmount = episodesAmount;
    }

    if (title) {
      const findMediaWithSameTitle = await this.mediasRepository.findByTitle(
        title,
      );

      if (findMediaWithSameTitle && findMediaWithSameTitle.id !== mediaId) {
        throw new AppError('This media already exists');
      }

      media.title = title;
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
