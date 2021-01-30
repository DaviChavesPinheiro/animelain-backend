import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Media from '../infra/typeorm/entities/Media';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  search?: string;
  categories?: string[];
  page?: number;
}

@injectable()
export default class ListMediasService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    search,
    categories,
    page = 1,
  }: IRequest): Promise<Media[]> {
    const cacheKey = `medias`;

    // let medias = await this.cacheProvider.recover<Media[]>(cacheKey);
    let medias;

    if (!medias) {
      medias = await this.mediasRepository.find(
        { search, categories },
        { page },
      );

      await this.cacheProvider.save(cacheKey, classToClass(medias));
    }

    return medias;
  }
}
