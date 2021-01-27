import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AnimeCharacter from '../infra/typeorm/entities/AnimeCharacter';
import IAnimesCharactersRepository from '../repositories/IAnimesCharactersRepository';

interface IRequest {
  animeId: string;
  characterId: string;
}

@injectable()
export default class RemoveAnimeCharacterService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('AnimesCharactersRepository')
    private animesCharactersRepository: IAnimesCharactersRepository,
  ) {}

  public async execute({
    characterId,
    animeId,
  }: IRequest): Promise<AnimeCharacter> {
    const character = await this.charactersRepository.findById(characterId);

    if (!character) {
      throw new AppError('Character does not exist');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfAnimeCharacterAlreadyExist = await this.animesCharactersRepository.findByAnimeIdAndCharacterId(
      { animeId, characterId },
    );

    if (!checkIfAnimeCharacterAlreadyExist) {
      throw new AppError('This Anime Character does not already exists');
    }

    await this.animesCharactersRepository.deleteById(
      checkIfAnimeCharacterAlreadyExist.id,
    );

    return checkIfAnimeCharacterAlreadyExist;
  }
}
