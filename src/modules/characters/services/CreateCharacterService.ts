import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Character from '../infra/typeorm/entities/Character';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  name: string;
  description: string;
  age: number;
  animesIds: string[];
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
    animesIds,
  }: IRequest): Promise<Character> {
    if (!Number.isInteger(age) || Number(age) < 0) {
      throw new AppError('Age cannot be negative');
    }

    const animes = animesIds.map(id => {
      const anime = new Anime();
      Object.assign(anime, {
        id,
      });

      return anime;
    });

    const character = await this.charactersRepository.create({
      name,
      description,
      age,
      animes,
    });

    return character;
  }
}
