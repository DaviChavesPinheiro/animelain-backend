import { getRepository, Repository } from 'typeorm';
import ICreateAnimeDTO from '@modules/animes/dtos/ICreateAnimeDTO';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import Anime from '../entities/Anime';

export default class AnimesRepository implements IAnimeRepository {
  private ormRepository: Repository<Anime>;

  constructor() {
    this.ormRepository = getRepository(Anime);
  }

  public async find(): Promise<Anime[]> {
    return this.ormRepository.find({ relations: ['created_by'] });
  }

  public async findByTitle(title: string): Promise<Anime | undefined> {
    const findedAnime = await this.ormRepository.findOne({ where: { title } });

    return findedAnime;
  }

  public async create({
    title,
    description,
    episodesAmount,
    created_by_id,
  }: ICreateAnimeDTO): Promise<Anime> {
    const anime = this.ormRepository.create({
      title,
      description,
      episodesAmount,
      created_by_id,
    });

    await this.ormRepository.save(anime);

    return anime;
  }
}
