import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ListAnimesService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Character | undefined> {
    const character = this.charactersRepository.findById(id);

    return character;
  }
}
