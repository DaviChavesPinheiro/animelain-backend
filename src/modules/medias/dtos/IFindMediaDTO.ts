import { MediaSeason, MediaType } from '../infra/typeorm/entities/Media';

export default interface IFindMediaDTO {
  type?: MediaType;
  search?: string;
  title?: string;
  season?: MediaSeason;
  categoryIn?: string[];
  characterIn?: string[];
  episodesAmount?: number;
}
