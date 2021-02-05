import { inject, injectable } from 'tsyringe';
import Media, { MediaSeason, MediaType } from '../infra/typeorm/entities/Media';
import IMediaRepository from '../repositories/IMediasRepository';

interface IRequest {
  type?: MediaType;
  search?: string;
  title?: string;
  season?: MediaSeason;
  categoryIn?: string[];
  episodesAmount?: number;
}

@injectable()
export default class ListMediasService {
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
    episodesAmount,
  }: IRequest): Promise<Media[]> {
    const medias = await this.mediasRepository.find({
      type,
      search,
      title,
      season,
      categoryIn,
      episodesAmount,
    });

    return medias;
  }
}
