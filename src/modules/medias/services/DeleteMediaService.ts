import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMediasRepository from '../repositories/IMediasRepository';
import Media from '../infra/typeorm/entities/Media';

interface IRequest {
  id: string;
}

@injectable()
class DeleteMediaService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediasRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Media> {
    const media = await this.mediasRepository.findById(id);

    if (!media) {
      throw new AppError('Media does not exist.');
    }

    await this.mediasRepository.deleteById(media.id);

    return media;
  }
}

export default DeleteMediaService;
