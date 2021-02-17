import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import { MediaSeason, MediaType } from '../infra/typeorm/entities/Media';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  type?: MediaType;
  search?: string;
  title?: string;
  season?: MediaSeason;
  categoryIn?: string[];
  characterIn?: string[];
  episodesAmount?: number;
  page: number;
  perPage: number;
}

@injectable()
export default class ListMediasPageInfoService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,
  ) {}

  public async execute({
    type,
    search,
    title,
    season,
    categoryIn,
    characterIn,
    episodesAmount,
    page,
    perPage,
  }: IRequest): Promise<PageInfo> {
    const mediasAmount = await this.mediasRepository.count({
      type,
      search,
      title,
      season,
      categoryIn,
      characterIn,
      episodesAmount,
      page,
      perPage,
    });

    return {
      total: mediasAmount,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(mediasAmount / perPage),
      hasNextPage: page < Math.ceil(mediasAmount / perPage),
    };
  }
}
