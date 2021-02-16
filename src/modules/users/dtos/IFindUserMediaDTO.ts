import { MediaType } from '@modules/medias/infra/typeorm/entities/Media';
import { UserMediaStatus } from '../infra/typeorm/entities/UserMedia';

export default interface IFindUserMediaDTO {
  userId: string;
  userMediaStatus?: UserMediaStatus;
  mediaType?: MediaType;
  page: number;
  perPage: number;
}
