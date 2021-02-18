import { UserCharacterStatus } from '../infra/typeorm/entities/UserCharacter';

export default interface IFindUserCharacterDTO {
  userId: string;
  userCharacterStatus?: UserCharacterStatus;
  page: number;
  perPage: number;
}
