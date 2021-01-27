import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AnimeCharacter from '../infra/typeorm/entities/AnimeCharacter';
import IAnimesCharactersRepository from '../repositories/IAnimesCharactersRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  animeId: string;
}

@injectable()
export default class ListAnimeCharactersService {
  constructor(
    @inject('AnimesRepository')
    private animeRepository: IAnimeRepository,

    @inject('AnimesCharactersRepository')
    private animesCharactersRepository: IAnimesCharactersRepository,
  ) {}

  public async execute({ animeId }: IRequest): Promise<AnimeCharacter[]> {
    const anime = await this.animeRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    return this.animesCharactersRepository.findByAnimeId(animeId);
  }
}
