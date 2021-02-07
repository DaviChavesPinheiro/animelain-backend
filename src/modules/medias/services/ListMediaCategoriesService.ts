import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MediaCategory from '../infra/typeorm/entities/MediaCategory';
import IMediasCategoriesRepository from '../repositories/IMediasCategoriesRepository';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  mediaId: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListMediaCategoriesService {
  constructor(
    @inject('MediasRepository')
    private mediaRepository: IMediaRepository,

    @inject('MediasCategoriesRepository')
    private mediasCategoriesRepository: IMediasCategoriesRepository,
  ) {}

  public async execute({
    mediaId,
    page,
    perPage,
  }: IRequest): Promise<MediaCategory[]> {
    const media = await this.mediaRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    return this.mediasCategoriesRepository.find({ mediaId, page, perPage });
  }
}
