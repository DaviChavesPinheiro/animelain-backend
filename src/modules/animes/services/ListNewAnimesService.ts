import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

@injectable()
export default class ListNewAnimesService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute(): Promise<Anime[]> {
    const animes = await this.animesRepository.findNews();

    return animes;
  }
}
