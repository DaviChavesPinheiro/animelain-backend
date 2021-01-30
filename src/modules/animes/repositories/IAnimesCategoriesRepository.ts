import ICreateAnimeCategoryDTO from '../dtos/ICreateAnimeCategoryDTO';
import IFindByIdAnimeCategoryDTO from '../dtos/IFindByIdAnimeCategoryDTO';
import AnimeCategory from '../infra/typeorm/entities/AnimeCategory';

export default interface IAnimesCategoriesRepository {
  findByAnimeId(id: string): Promise<AnimeCategory[]>;
  findByAnimeIdAndCategoryId(
    data: IFindByIdAnimeCategoryDTO,
  ): Promise<AnimeCategory | undefined>;
  findById(id: string): Promise<AnimeCategory | undefined>;
  create(data: ICreateAnimeCategoryDTO): Promise<AnimeCategory>;
  deleteById(id: string): Promise<void>;
}
