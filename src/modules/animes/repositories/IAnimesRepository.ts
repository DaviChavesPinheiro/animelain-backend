import ICreateAnimeDTO from '../dtos/ICreateAnimeDTO';
import Anime from '../infra/typeorm/entities/Anime';

export default interface IAnimeRepository {
  findByTitle(title: string): Promise<Anime | undefined>;
  find(): Promise<Anime[]>;
  create(data: ICreateAnimeDTO): Promise<Anime>;
}
