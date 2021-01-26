import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Genre from '../infra/typeorm/entities/Genre';
import IGenresRepository from '../repositories/IGenresRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  anime_id: string;
}

@injectable()
export default class ListAnimeGenresService {
  constructor(
    @inject('AnimesRepository')
    private animeRepository: IAnimeRepository,

    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({ anime_id }: IRequest): Promise<Genre[]> {
    const anime = await this.animeRepository.findById(anime_id);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    return this.genresRepository.findByAnimeId(anime_id);
  }
}
