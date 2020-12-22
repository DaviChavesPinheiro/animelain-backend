import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

@injectable()
export default class ListCharactersService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute(): Promise<Character[]> {
    const characters = this.charactersRepository.find();

    return characters;
  }
}
