import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Character | undefined> {
    const character = await this.charactersRepository.findById(id);

    if (!character) {
      throw new AppError('This character does not exist');
    }

    return character;
  }
}
