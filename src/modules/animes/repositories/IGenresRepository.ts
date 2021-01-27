import ICreateGenreDTO from '../dtos/ICreateGenreDTO';
import IFindByIdGenreDTO from '../dtos/IFindByIdGenreDTO';
import Genre from '../infra/typeorm/entities/AnimeGenre';

export default interface IGenresRepository {
  findByAnimeId(id: string): Promise<Genre[]>;
  findByAnimeIdAndCategoryId(
    data: IFindByIdGenreDTO,
  ): Promise<Genre | undefined>;
  findById(id: string): Promise<Genre | undefined>;
  create(data: ICreateGenreDTO): Promise<Genre>;
  deleteById(id: string): Promise<void>;
}
