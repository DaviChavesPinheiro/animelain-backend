import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICharactersRepository from '../repositories/ICharactersRepository';
import Character from '../infra/typeorm/entities/Character';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(id);

    if (!character) {
      throw new AppError('Character does not exist.');
    }

    await this.charactersRepository.deleteById(character.id);

    return character;
  }
}

export default DeleteCharacterService;
