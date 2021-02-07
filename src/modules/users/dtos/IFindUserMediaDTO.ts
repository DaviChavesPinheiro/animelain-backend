import { UserMediaStatus } from '../infra/typeorm/entities/UserMedia';

export default interface IFindUserMediaDTO {
  userId: string;
  userMediaStatus?: UserMediaStatus;
  page: number;
  perPage: number;
}
