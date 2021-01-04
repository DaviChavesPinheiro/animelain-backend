import ICreateGenreDTO from '@modules/animes/dtos/ICreateGenreDTO';
import IFindByIdGenreDTO from '@modules/animes/dtos/IFindByIdGenreDTO';
import Genre from '@modules/animes/infra/typeorm/entities/Genre';
import { v4 as uuid } from 'uuid';
import IGenresRepository from '../IGenresRepository';

export default class FakeGenresRepository implements IGenresRepository {
  private genres: Genre[] = [];

  public async findByAnimeId(anime_id: string): Promise<Genre[]> {
    return this.genres.filter(genre => genre.anime_id === anime_id);
  }

  public async deleteById(id: string): Promise<Genre> {
    const genreToRemove = this.genres.find(genre => genre.id === id) as Genre;

    this.genres = this.genres.filter(genre => genre.id === id);

    return genreToRemove;
  }

  public async findById(id: string): Promise<Genre | undefined> {
    const findGenre = this.genres.find(user => user.id === id);

    return findGenre;
  }

  public async findByAnimeIdAndCategoryId({
    category_id,
    anime_id,
  }: IFindByIdGenreDTO): Promise<Genre | undefined> {
    return this.genres.find(
      genre => genre.category_id === category_id && genre.anime_id === anime_id,
    );
  }

  public async create({
    anime_id,
    category_id,
    score,
  }: ICreateGenreDTO): Promise<Genre> {
    const genre = new Genre();

    genre.id = uuid();
    genre.anime_id = anime_id;
    genre.category_id = category_id;
    genre.score = score;
    genre.created_at = new Date();
    genre.updated_at = new Date();

    this.genres.push(genre);

    return genre;
  }
}
