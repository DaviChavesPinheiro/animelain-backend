import { UserCharacterStatus } from '../infra/typeorm/entities/UserCharacter';

export default interface ICreateUserCharacterDTO {
  userId: string;
  characterId: string;
  userCharacterStatus: UserCharacterStatus;
}
