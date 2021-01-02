import { inject, injectable } from 'tsyringe';
import Anime from '../infra/typeorm/entities/Anime';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  id: string;
  user_id?: string;
}

@injectable()
export default class ListAnimesService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Anime | undefined> {
    const anime = this.animesRepository.findById({ id, user_id });

    return anime;
  }
}
