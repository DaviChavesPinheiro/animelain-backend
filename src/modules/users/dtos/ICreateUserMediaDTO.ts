import { UserMediaStatus } from '../infra/typeorm/entities/UserMedia';

export default interface ICreateUserMediaDTO {
  userId: string;
  mediaId: string;
  userMediaStatus: UserMediaStatus;
}
