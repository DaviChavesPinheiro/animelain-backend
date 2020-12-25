import { getRepository, Repository } from 'typeorm';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import Character from '../entities/Character';

export default class CharactersRepository implements ICharactersRepository {
  private ormRepository: Repository<Character>;

  constructor() {
    this.ormRepository = getRepository(Character);
  }

  public async find(): Promise<Character[]> {
    return this.ormRepository.find();
  }

  public async findByName(name: string): Promise<Character | undefined> {
    const findedCharacter = await this.ormRepository.findOne({
      where: { name },
    });

    return findedCharacter;
  }

  public async create({
    name,
    description,
    age,
  }: ICreateCharacterDTO): Promise<Character> {
    const character = this.ormRepository.create({
      name,
      description,
      age,
    });

    await this.ormRepository.save(character);

    return character;
  }
}
