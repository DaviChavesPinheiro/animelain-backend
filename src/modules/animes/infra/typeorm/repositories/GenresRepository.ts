import ICreateGenreDTO from '@modules/animes/dtos/ICreateGenreDTO';
import IFindByIdGenreDTO from '@modules/animes/dtos/IFindByIdGenreDTO';
import IGenresRepository from '@modules/animes/repositories/IGenresRepository';
import { Repository, getRepository } from 'typeorm';
import Genre from '../entities/AnimeGenre';

class GenresRepository implements IGenresRepository {
  private ormRepository: Repository<Genre>;

  constructor() {
    this.ormRepository = getRepository(Genre);
  }

  public async findByAnimeId(animeId: string): Promise<Genre[]> {
    const genres = await this.ormRepository.find({
      animeId,
    });

    return genres;
  }

  public async findByAnimeIdAndCategoryId({
    animeId,
    categoryId,
  }: IFindByIdGenreDTO): Promise<Genre | undefined> {
    const genre = await this.ormRepository.findOne({
      animeId,
      categoryId,
    });

    return genre;
  }

  public async findById(id: string): Promise<Genre | undefined> {
    const genre = await this.ormRepository.findOne(id);

    return genre;
  }

  public async create({
    animeId,
    categoryId,
    score,
  }: ICreateGenreDTO): Promise<Genre> {
    const genre = this.ormRepository.create({
      animeId,
      categoryId,
      score,
    });

    await this.ormRepository.save(genre);

    return genre;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default GenresRepository;
