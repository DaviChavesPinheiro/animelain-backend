import ICreateCharacterDTO from '../dtos/ICreateCharacterDTO';
import IFindCharacterDTO from '../dtos/IFindCharacterDTO';
import Character from '../infra/typeorm/entities/Character';

export default interface ICharactersRepository {
  findByName(name: string): Promise<Character | undefined>;
  find(data: IFindCharacterDTO): Promise<Character[]>;
  findById(id: string): Promise<Character | undefined>;
  create(data: ICreateCharacterDTO): Promise<Character>;
  save(data: Character): Promise<Character>;
  findAllById(ids: string[]): Promise<Character[]>;
  deleteById(id: string): Promise<void>;
}
