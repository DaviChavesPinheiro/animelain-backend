import ICreateMediaCategoryDTO from '../dtos/ICreateMediaCategoryDTO';
import IFindByIdMediaCategoryDTO from '../dtos/IFindByIdMediaCategoryDTO';
import IFindMediaCategoryDTO from '../dtos/IFindMediaCategoryDTO';
import MediaCategory from '../infra/typeorm/entities/MediaCategory';

export default interface IMediasCategoriesRepository {
  find(data: IFindMediaCategoryDTO): Promise<MediaCategory[]>;
  count(data: IFindMediaCategoryDTO): Promise<number>;
  findByMediaIdAndCategoryId(
    data: IFindByIdMediaCategoryDTO,
  ): Promise<MediaCategory | undefined>;
  findById(id: string): Promise<MediaCategory | undefined>;
  create(data: ICreateMediaCategoryDTO): Promise<MediaCategory>;
  deleteById(id: string): Promise<void>;
}
