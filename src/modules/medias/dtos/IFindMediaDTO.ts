import { MediaType } from '../infra/typeorm/entities/Media';

export default interface IFindMediaDTO {
  type?: MediaType;
  search?: string;
  title?: string;
  episodesAmount?: number;
}
