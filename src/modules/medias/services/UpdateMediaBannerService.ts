import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import IMediaRepository from '../repositories/IMediasRepository';
import Media from '../infra/typeorm/entities/Media';

interface IRequest {
  mediaId: string;
  avatarFilename: string;
}

@injectable()
class UpdateMediaBannerService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ mediaId, avatarFilename }: IRequest): Promise<Media> {
    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('This media does not exist', 401);
    }

    if (media.banner) {
      await this.storageProvider.deleteFile(media.banner);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    media.banner = filename;

    await this.mediasRepository.save(media);

    return media;
  }
}

export default UpdateMediaBannerService;
