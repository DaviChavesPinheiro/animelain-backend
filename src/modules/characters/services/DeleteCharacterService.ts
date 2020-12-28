import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const character = await this.charactersRepository.findById(id);

    if (!character) {
      throw new AppError('Character does not exist.');
    }

    await this.charactersRepository.deleteById(character.id);
  }
}

export default DeleteCharacterService;
