import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListCharactersService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({
    search,
    page,
    perPage,
  }: IRequest): Promise<Character[]> {
    const characters = await this.charactersRepository.find({
      search,
      page,
      perPage,
    });

    return characters;
  }
}
