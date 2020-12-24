import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  name: string;
  description: string;
  age: number;
}

@injectable()
export default class CreateCharacterService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    name,
    description,
    age,
  }: IRequest): Promise<Character> {
    if (!Number.isInteger(age) || Number(age) < 0) {
      throw new AppError('Age cannot be negative');
    }

    const character = await this.charactersRepository.create({
      name,
      description,
      age,
    });

    return character;
  }
}
