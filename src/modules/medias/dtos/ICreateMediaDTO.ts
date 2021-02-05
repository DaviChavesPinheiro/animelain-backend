import { MediaSeason, MediaType } from '../infra/typeorm/entities/Media';

export default interface ICreateMediaDTO {
  type: MediaType;
  title: string;
  season?: MediaSeason;
  description?: string;
  episodesAmount?: number;
  createdById: string;
}
