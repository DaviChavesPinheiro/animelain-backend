import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  search?: string;
}

@injectable()
export default class ListCharactersService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<Character[]> {
    const characters = this.charactersRepository.find({
      search,
    });

    return characters;
  }
}
