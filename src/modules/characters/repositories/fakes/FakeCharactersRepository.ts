import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import IFindCharacterDTO from '@modules/characters/dtos/IFindCharacterDTO';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import { v4 as uuid } from 'uuid';

export default class FakeCharactersRepository implements ICharactersRepository {
  private characters: Character[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async find({ search }: IFindCharacterDTO): Promise<Character[]> {
    return this.characters;
  }

  public async findByName(name: string): Promise<Character | undefined> {
    const characterWithSameName = this.characters.find(
      character => character.name === name,
    );

    return characterWithSameName;
  }

  public async create({
    name,
    description,
    age,
  }: ICreateCharacterDTO): Promise<Character> {
    const character = new Character();

    Object.assign(character, {
      id: uuid(),
      name,
      description,
      age,
    });

    this.characters.push(character);

    return character;
  }

  public async findById(id: string): Promise<Character | undefined> {
    const characterWithSameId = this.characters.find(
      character => character.id === id,
    );

    return characterWithSameId;
  }

  public async save(character: Character): Promise<Character> {
    const findIndex = this.characters.findIndex(
      findCharacter => findCharacter.id === character.id,
    );

    this.characters[findIndex] = character;

    return character;
  }

  public async findAllById(ids: string[]): Promise<Character[]> {
    const existentCharacters = this.characters.filter(character =>
      ids.includes(character.id),
    );

    return existentCharacters;
  }

  public async deleteById(id: string): Promise<void> {
    const charactersFiltered = this.characters.filter(
      character => character.id !== id,
    );

    this.characters = charactersFiltered;
  }
}
