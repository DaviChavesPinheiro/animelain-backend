import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AnimeCharacter from '../infra/typeorm/entities/AnimeCharacter';
import IAnimesCharactersRepository from '../repositories/IAnimesCharactersRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  anime_id: string;
}

@injectable()
export default class ListAnimeCharactersService {
  constructor(
    @inject('AnimesRepository')
    private animeRepository: IAnimeRepository,

    @inject('AnimesCharactersRepository')
    private animesCharactersRepository: IAnimesCharactersRepository,
  ) {}

  public async execute({ anime_id }: IRequest): Promise<AnimeCharacter[]> {
    const anime = await this.animeRepository.findById({ id: anime_id });

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    return this.animesCharactersRepository.findByAnimeId(anime_id);
  }
}
