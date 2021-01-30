import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Media from '../infra/typeorm/entities/Media';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  title: string;
  description?: string;
  episodesAmount?: number;
  createdById: string;
}

@injectable()
export default class CreateMediaService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    title,
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

    await this.cacheProvider.invalidate('medias');

    const media = await this.mediasRepository.create({
      title,
      description,
      episodesAmount,
      createdById,
    });

    return media;
  }
}
