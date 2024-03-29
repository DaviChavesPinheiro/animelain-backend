import ICreateMediaDTO from '../dtos/ICreateMediaDTO';
import IFindMediaDTO from '../dtos/IFindMediaDTO';
import Media from '../infra/typeorm/entities/Media';

export default interface IMediaRepository {
  findByTitle(title: string): Promise<Media | undefined>;
  findById(id: string): Promise<Media | undefined>;
  find(data: IFindMediaDTO): Promise<Media[]>;
  count(data: IFindMediaDTO): Promise<number>;
  findNews(): Promise<Media[]>;
  findInSeason(): Promise<Media[]>;
  create(data: ICreateMediaDTO): Promise<Media>;
  save(data: Media): Promise<Media>;
  deleteById(id: string): Promise<void>;
}
