import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MediaCharacter from '../infra/typeorm/entities/MediaCharacter';
import IMediasCharactersRepository from '../repositories/IMediasCharactersRepository';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  mediaId: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListMediaCharactersService {
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
  }: IRequest): Promise<MediaCharacter[]> {
    const media = await this.mediaRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    return this.mediasCharactersRepository.find({
      mediaId,
      page,
      perPage,
    });
  }
}
