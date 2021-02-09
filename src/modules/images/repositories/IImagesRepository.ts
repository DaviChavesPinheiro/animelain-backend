import ICreateImageDTO from '../dtos/ICreateImageDTO';
import IFindImageDTO from '../dtos/IFindImageDTO';
import Image from '../infra/typeorm/entities/Image';

export default interface IImagesRepository {
  findByFileName(fileName: string): Promise<Image | undefined>;
  find(data: IFindImageDTO): Promise<Image[]>;
  findById(id: string): Promise<Image | undefined>;
  create(data: ICreateImageDTO): Promise<Image>;
  save(data: Image): Promise<Image>;
  deleteById(id: string): Promise<void>;
}
