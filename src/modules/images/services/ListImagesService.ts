import { inject, injectable } from 'tsyringe';
import Image from '../infra/typeorm/entities/Image';
import IImagesRepository from '../repositories/IImagesRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListImagesService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) {}

  public async execute({ search, page, perPage }: IRequest): Promise<Image[]> {
    const images = await this.imagesRepository.find({
      search,
      page,
      perPage,
    });

    return images;
  }
}
