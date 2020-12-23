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
    const anime = this.animesRepository.findById(id);

    return anime;
  }
}
