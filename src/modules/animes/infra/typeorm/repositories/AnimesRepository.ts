import { getRepository, ILike, Repository } from 'typeorm';
import ICreateAnimeDTO from '@modules/animes/dtos/ICreateAnimeDTO';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import IFindAnimeDTO from '@modules/animes/dtos/IFindAnimeDTO';
import Anime from '../entities/Anime';

export default class AnimesRepository implements IAnimeRepository {
  private ormRepository: Repository<Anime>;

  constructor() {
    this.ormRepository = getRepository(Anime);
  }

  public async find({ search }: IFindAnimeDTO): Promise<Anime[]> {
    return this.ormRepository.find({
      where: {
        ...(search && { title: ILike(`%${search}%`) }),
      },
    });
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

  public async findById(id: string): Promise<Anime | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ['genres', 'genres.category', 'characters'],
    });
    return user;
  }

  public async save(data: Anime): Promise<Anime> {
    return this.ormRepository.save(data);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
