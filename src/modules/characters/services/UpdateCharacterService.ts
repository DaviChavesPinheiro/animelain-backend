import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  character_id: string;
  name: string;
  description: string;
  age: number;
}

@injectable()
class UpdateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    character_id,
    name,
    description,
    age,
  }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(character_id);

    if (!character) {
      throw new AppError('Character not found.');
    }

    if (!Number.isInteger(age) || Number(age) < 0) {
      throw new AppError('An age cannot be negative');
    }

    const findCharacterWithSameName = await this.charactersRepository.findByName(
      name,
    );

    if (
      findCharacterWithSameName &&
      findCharacterWithSameName.id !== character_id
    ) {
      throw new AppError('This character already exists');
    }

    character.name = name;
    character.description = description;
    character.age = age;

    return this.charactersRepository.save(character);
  }
}

export default UpdateCharacterService;
