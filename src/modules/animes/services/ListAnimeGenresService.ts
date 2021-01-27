import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Genre from '../infra/typeorm/entities/AnimeGenre';
import IGenresRepository from '../repositories/IGenresRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  animeId: string;
}

@injectable()
export default class ListAnimeGenresService {
  constructor(
    @inject('AnimesRepository')
    private animeRepository: IAnimeRepository,

    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({ animeId }: IRequest): Promise<Genre[]> {
    const anime = await this.animeRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    return this.genresRepository.findByAnimeId(animeId);
  }
}
