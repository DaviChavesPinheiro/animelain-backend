import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  name: string;
  description?: string;
  age?: number;
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
    const character = await this.charactersRepository.create({
      name,
      description,
      age,
    });

    return character;
  }
}
