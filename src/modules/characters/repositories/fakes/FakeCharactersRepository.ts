import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import { v4 as uuid } from 'uuid';

export default class FakeCharactersRepository implements ICharactersRepository {
  private characters: Character[] = [];

  public async find(): Promise<Character[]> {
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
    animes,
  }: ICreateCharacterDTO): Promise<Character> {
    const character = new Character();

    Object.assign(character, {
      id: uuid(),
      name,
      description,
      age,
      animes,
    });

    this.characters.push(character);

    return character;
  }
}
