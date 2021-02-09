import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import IImagesRepository from '../repositories/IImagesRepository';
import Image from '../infra/typeorm/entities/Image';

interface IRequest {
  id: string;
}

@injectable()
class DeleteImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<Image> {
    const image = await this.imagesRepository.findById(id);

    if (!image) {
      throw new AppError('Image does not exist.');
    }

    await this.storageProvider.deleteFile(image.fileName);

    await this.imagesRepository.deleteById(image.id);

    return image;
  }
}

export default DeleteImageService;
