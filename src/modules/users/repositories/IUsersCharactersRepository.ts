import ICreateUserCharacterDTO from '../dtos/ICreateUserCharacterDTO';
import IFindOneUserCharacterDTO from '../dtos/IFindOneUserCharacterDTO';
import IFindUserCharacterDTO from '../dtos/IFindUserCharacterDTO';
import UserCharacter from '../infra/typeorm/entities/UserCharacter';

export default interface IUsersCharactersRepository {
  findById(id: string): Promise<UserCharacter | undefined>;
  findOne(data: IFindOneUserCharacterDTO): Promise<UserCharacter | undefined>;
  find(data: IFindUserCharacterDTO): Promise<UserCharacter[]>;
  count(data: IFindUserCharacterDTO): Promise<number>;
  create(data: ICreateUserCharacterDTO): Promise<UserCharacter>;
  deleteById(id: string): Promise<UserCharacter>;
}
