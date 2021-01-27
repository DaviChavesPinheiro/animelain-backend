import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  title: string;
  description?: string;
  episodesAmount?: number;
  createdById: string;
}

@injectable()
export default class CreateAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    title,
    description,
    episodesAmount,
    createdById,
  }: IRequest): Promise<Anime> {
    const findAnimeWithSameTitle = await this.animesRepository.findByTitle(
      title,
    );

    if (findAnimeWithSameTitle) {
      throw new AppError('This anime already exists');
    }

    await this.cacheProvider.invalidate('animes');

    const anime = await this.animesRepository.create({
      title,
      description,
      episodesAmount,
      createdById,
    });

    return anime;
  }
}
