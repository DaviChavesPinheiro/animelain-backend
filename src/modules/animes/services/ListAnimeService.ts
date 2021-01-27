import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListAnimesService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Anime | undefined> {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new AppError('This anime does not exist');
    }

    return anime;
  }
}
