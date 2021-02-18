import AppError from '@shared/errors/AppError';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import IMediasCategoriesRepository from '../repositories/IMediasCategoriesRepository';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  mediaId: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListMediaCategoriesServicePageInfo {
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
  }: IRequest): Promise<PageInfo> {
    const media = await this.mediaRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    const mediaCategoriesAmount = await this.mediasCategoriesRepository.count({
      mediaId,
      page,
      perPage,
    });

    return PageInfo.from(mediaCategoriesAmount, page, perPage);
  }
}
