import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import IImagesRepository from '../repositories/IImagesRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListImagesPageInfoService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) {}

  public async execute({ search, page, perPage }: IRequest): Promise<PageInfo> {
    const imagesAmount = await this.imagesRepository.count({
      search,
      page,
      perPage,
    });

    return {
      total: imagesAmount,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(imagesAmount / perPage),
      hasNextPage: page < Math.ceil(imagesAmount / perPage),
    };
  }
}
