import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  characterId: string;
  name?: string;
  description?: string;
  age?: number;
}

@injectable()
class UpdateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    characterId,
    name,
    description,
    age,
  }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(characterId);

    if (!character) {
      throw new AppError('Character not found.');
    }

    if (age) {
      if (!Number.isInteger(age) || Number(age) < 0) {
        throw new AppError('An age cannot be negative');
      }

      character.age = age;
    }

    if (name) {
      const findCharacterWithSameName = await this.charactersRepository.findByName(
        name,
      );

      if (
        findCharacterWithSameName &&
        findCharacterWithSameName.id !== characterId
      ) {
        throw new AppError('This character already exists');
      }

      character.name = name;
    }

    if (description) {
      character.description = description;
    }

    return this.charactersRepository.save(character);
  }
}

export default UpdateCharacterService;
