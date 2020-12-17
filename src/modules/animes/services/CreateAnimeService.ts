import { inject, injectable } from 'tsyringe';
import IAnimeRepository from '../repositories/IAnimesRepository';

interface IRequest {
  title: string;
  description: string;
  episodesAmount: number;
  created_by_id: string;
}

@injectable()
export default class CreateAnimeService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,
  ) {}

  public async execute({
    title,
    description,
    episodesAmount,
    created_by_id,
  }: IRequest): Promise<IRequest> {
    if (!Number.isInteger(episodesAmount) || Number(episodesAmount) < 0) {
      throw new Error('Episodes cannot be negative');
    }

    const findAnimeWithSameTitle = await this.animesRepository.findByTitle(
      title,
    );

    if (findAnimeWithSameTitle) {
      throw new Error('This anime already exists');
    }

    const anime = await this.animesRepository.create({
      title,
      description,
      episodesAmount,
      created_by_id,
    });

    return anime;
  }
}
