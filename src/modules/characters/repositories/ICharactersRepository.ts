import ICreateCharacterDTO from '../dtos/ICreateCharacterDTO';
import Character from '../infra/typeorm/entities/Character';

export default interface ICharactersRepository {
  findByName(name: string): Promise<Character | undefined>;
  find(): Promise<Character[]>;
  findById(id: string): Promise<Character | undefined>;
  create(data: ICreateCharacterDTO): Promise<Character>;
  save(data: Character): Promise<Character>;
}
