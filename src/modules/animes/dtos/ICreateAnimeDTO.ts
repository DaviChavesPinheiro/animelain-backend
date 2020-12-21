import Genre from '../infra/typeorm/entities/Genre';

export default interface ICreateAnimeDTO {
  title: string;
  description: string;
  episodesAmount: number;
  created_by_id: string;
  genres: Genre[];
}
