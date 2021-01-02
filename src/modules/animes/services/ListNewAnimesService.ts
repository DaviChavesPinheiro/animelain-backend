import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

@injectable()
export default class ListNewAnimesService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Anime[]> {
    const cacheKey = `animes`;

    // let animes = await this.cacheProvider.recover<Anime[]>(cacheKey);
    let animes;

    if (!animes) {
      animes = await this.animesRepository.findNews();

      await this.cacheProvider.save(cacheKey, classToClass(animes));
    }

    return animes;
  }
}