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
  ) {}

  public async execute({
    search,
    categories,
    page = 1,
  }: IRequest): Promise<Media[]> {
    const medias = await this.mediasRepository.find(
      { search, categories },
      { page },
    );

    return medias;
  }
}
