import { UserCharacterStatus } from '../infra/typeorm/entities/UserCharacter';

export default interface IFindOneUserCharacterDTO {
  userId: string;
  characterId: string;
  userCharacterStatus: UserCharacterStatus;
}
