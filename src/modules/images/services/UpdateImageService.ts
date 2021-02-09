import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Image, { ImageType } from '../infra/typeorm/entities/Image';
import IImagesRepository from '../repositories/IImagesRepository';

interface IRequest {
  id: string;
  title?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  encoding?: string;
  size?: number;
  type?: ImageType;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) {}

  public async execute({
    id,
    title,
    width,
    height,
    mimeType,
    encoding,
    size,
    type,
  }: IRequest): Promise<Image> {
    const image = await this.imagesRepository.findById(id);

    if (!image) {
      throw new AppError('Image not found.');
    }

    if (width) {
      image.width = width;
    }

    if (height) {
      image.height = height;
    }

    if (title) {
      image.title = title;
    }

    if (mimeType) {
      image.mimeType = mimeType;
    }

    if (encoding) {
      image.encoding = encoding;
    }

    if (size) {
      image.size = size;
    }

    if (type) {
      if (!Object.values(ImageType).includes(type)) {
        throw new AppError('This type does not exist');
      }

      image.type = type;
    }

    return this.imagesRepository.save(image);
  }
}

export default UpdateImageService;
