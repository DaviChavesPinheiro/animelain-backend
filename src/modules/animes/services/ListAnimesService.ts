import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

@injectable()
export default class ListAnimesService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute(): Promise<Anime[]> {
    const animes = this.animesRepository.find();

    return animes;
  }
}
