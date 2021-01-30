import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Media from '../infra/typeorm/entities/Media';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListMediasService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Media | undefined> {
    const media = await this.mediasRepository.findById(id);

    if (!media) {
      throw new AppError('This media does not exist');
    }

    return media;
  }
}
