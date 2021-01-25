import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAnimesRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';

interface IRequest {
  id: string;
}

@injectable()
class DeleteAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Anime> {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new AppError('Anime does not exist.');
    }

    await this.animesRepository.deleteById(anime.id);

    return anime;
  }
}

export default DeleteAnimeService;
