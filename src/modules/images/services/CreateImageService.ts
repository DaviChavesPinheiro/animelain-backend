import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Image, { ImageType } from '../infra/typeorm/entities/Image';
import IImagesRepository from '../repositories/IImagesRepository';

interface IRequest {
  fileName: string;
  title?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  encoding?: string;
  size?: number;
  type?: ImageType;
}

@injectable()
export default class CreateImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    fileName,
    title,
    width,
    height,
    mimeType,
    encoding,
    size,
    type,
  }: IRequest): Promise<Image> {
    const findImageWithSameFileName = await this.imagesRepository.findByFileName(
      fileName,
    );

    if (findImageWithSameFileName) {
      throw new AppError('This image already exists');
    }

    if (type) {
      if (!Object.values(ImageType).includes(type)) {
        throw new AppError('This type does not exist');
      }
    }

    await this.storageProvider.saveFile(fileName);

    const image = await this.imagesRepository.create({
      fileName,
      title,
      width,
      height,
      mimeType,
      encoding,
      size,
      type,
    });

    return image;
  }
}
