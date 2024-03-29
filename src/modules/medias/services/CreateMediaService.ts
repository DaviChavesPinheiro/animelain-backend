import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Media, { MediaSeason, MediaType } from '../infra/typeorm/entities/Media';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  type: MediaType;
  title: string;
  season?: MediaSeason;
  description?: string;
  episodesAmount?: number;
  createdById: string;
}

@injectable()
export default class CreateMediaService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,
  ) {}

  public async execute({
    type,
    title,
    season,
    description,
    episodesAmount,
    createdById,
  }: IRequest): Promise<Media> {
    const findMediaWithSameTitle = await this.mediasRepository.findByTitle(
      title,
    );

    if (findMediaWithSameTitle) {
      throw new AppError('This media already exists');
    }

    if (!Object.values(MediaType).includes(type)) {
      throw new AppError('This type does not exist');
    }

    const media = await this.mediasRepository.create({
      type,
      title,
      season,
      description,
      episodesAmount,
      createdById,
    });

    return media;
  }
}
