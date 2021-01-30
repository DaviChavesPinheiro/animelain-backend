import ICreateMediaCategoryDTO from '../dtos/ICreateMediaCategoryDTO';
import IFindByIdMediaCategoryDTO from '../dtos/IFindByIdMediaCategoryDTO';
import MediaCategory from '../infra/typeorm/entities/MediaCategory';

export default interface IMediasCategoriesRepository {
  findByMediaId(id: string): Promise<MediaCategory[]>;
  findByMediaIdAndCategoryId(
    data: IFindByIdMediaCategoryDTO,
  ): Promise<MediaCategory | undefined>;
  findById(id: string): Promise<MediaCategory | undefined>;
  create(data: ICreateMediaCategoryDTO): Promise<MediaCategory>;
  deleteById(id: string): Promise<void>;
}
