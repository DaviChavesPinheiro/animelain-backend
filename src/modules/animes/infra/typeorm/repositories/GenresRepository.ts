import ICreateGenreDTO from '@modules/animes/dtos/ICreateGenreDTO';
import IFindByIdGenreDTO from '@modules/animes/dtos/IFindByIdGenreDTO';
import IGenresRepository from '@modules/animes/repositories/IGenresRepository';
import { Repository, getRepository } from 'typeorm';
import Genre from '../entities/Genre';

class GenresRepository implements IGenresRepository {
  private ormRepository: Repository<Genre>;

  constructor() {
    this.ormRepository = getRepository(Genre);
  }

  public async findByAnimeId(anime_id: string): Promise<Genre[]> {
    const genres = await this.ormRepository.find({
      anime_id,
    });

    return genres;
  }

  public async findByAnimeIdAndCategoryId({
    anime_id,
    category_id,
  }: IFindByIdGenreDTO): Promise<Genre | undefined> {
    const genre = await this.ormRepository.findOne({
      anime_id,
      category_id,
    });

    return genre;
  }

  public async findById(id: string): Promise<Genre | undefined> {
    const genre = await this.ormRepository.findOne(id);

    return genre;
  }

  public async create({
    anime_id,
    category_id,
    score,
  }: ICreateGenreDTO): Promise<Genre> {
    const genre = this.ormRepository.create({
      anime_id,
      category_id,
      score,
    });

    await this.ormRepository.save(genre);

    return genre;
  }

  public async deleteById(id: string): Promise<Genre> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const genre = await this.ormRepository.remove(entityToRemove);

    return genre;
  }
}

export default GenresRepository;
