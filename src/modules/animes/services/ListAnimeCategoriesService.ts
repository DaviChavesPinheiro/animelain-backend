import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AnimeCategory from '../infra/typeorm/entities/AnimeCategory';
import IAnimesCategoriesRepository from '../repositories/IAnimesCategoriesRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  animeId: string;
}

@injectable()
export default class ListAnimeCategoriesService {
  constructor(
    @inject('AnimesRepository')
    private animeRepository: IAnimeRepository,

    @inject('AnimesCategoriesRepository')
    private animesCategoriesRepository: IAnimesCategoriesRepository,
  ) {}

  public async execute({ animeId }: IRequest): Promise<AnimeCategory[]> {
    const anime = await this.animeRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    return this.animesCategoriesRepository.findByAnimeId(animeId);
  }
}
