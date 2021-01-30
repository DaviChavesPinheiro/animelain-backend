import { MediaType } from '../infra/typeorm/entities/Media';

export default interface ICreateMediaDTO {
  type: MediaType;
  title: string;
  description?: string;
  episodesAmount?: number;
  createdById: string;
}
