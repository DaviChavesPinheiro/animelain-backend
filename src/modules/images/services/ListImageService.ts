import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Image from '../infra/typeorm/entities/Image';
import IImagesRepository from '../repositories/IImagesRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Image | undefined> {
    const image = await this.imagesRepository.findById(id);

    if (!image) {
      throw new AppError('This image does not exist');
    }

    return image;
  }
}
