import AppError from '@shared/errors/AppError';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import IMediasCharactersRepository from '../repositories/IMediasCharactersRepository';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  mediaId: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListMediaCharactersServicePageInfo {
  constructor(
    @inject('MediasRepository')
    private mediaRepository: IMediaRepository,

    @inject('MediasCharactersRepository')
    private mediasCharactersRepository: IMediasCharactersRepository,
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

    const mediaCharactersAmount = await this.mediasCharactersRepository.count({
      mediaId,
      page,
      perPage,
    });

    return PageInfo.from(mediaCharactersAmount, page, perPage);
  }
}
