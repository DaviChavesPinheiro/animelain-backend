import { UserMediaStatus } from '../infra/typeorm/entities/UserMedia';

export default interface IFindOneUserMediaDTO {
  userId: string;
  mediaId: string;
  userMediaStatus: UserMediaStatus;
}
