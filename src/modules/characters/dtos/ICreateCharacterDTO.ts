import Anime from '@modules/animes/infra/typeorm/entities/Anime';

export default interface ICreateCharacterDTO {
  name: string;
  description: string;
  age: number;
  animes: Anime[];
}
