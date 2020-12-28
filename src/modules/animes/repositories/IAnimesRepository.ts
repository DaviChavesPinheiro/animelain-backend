import ICreateAnimeDTO from '../dtos/ICreateAnimeDTO';
import Anime from '../infra/typeorm/entities/Anime';

export default interface IAnimeRepository {
  findByTitle(title: string): Promise<Anime | undefined>;
  findById(id: string): Promise<Anime | undefined>;
  find(): Promise<Anime[]>;
  create(data: ICreateAnimeDTO): Promise<Anime>;
  save(data: Anime): Promise<Anime>;
  deleteById(id: string): Promise<void>;
}
