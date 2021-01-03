import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AnimeCharacter from '../infra/typeorm/entities/AnimeCharacter';
import IAnimesCharactersRepository from '../repositories/IAnimesCharactersRepository';

interface IRequest {
  anime_id: string;
  character_id: string;
  role?: string;
}

@injectable()
export default class AddAnimeCharacterService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('AnimesCharactersRepository')
    private animesCharactersRepository: IAnimesCharactersRepository,
  ) {}

  public async execute({
    character_id,
    anime_id,
    role,
  }: IRequest): Promise<AnimeCharacter> {
    const character = await this.charactersRepository.findById(character_id);

    if (!character) {
      throw new AppError('Character does not exist');
    }

    const anime = await this.animesRepository.findById({ id: anime_id });

    if (!anime) {
      throw new AppError('Anime does not exist');
    }

    const checkIfAnimeCharacterAlreadyExist = await this.animesCharactersRepository.findByAnimeIdAndCharacterId(
      { anime_id, character_id },
    );

    if (checkIfAnimeCharacterAlreadyExist) {
      throw new AppError('This Anime Character already exists');
    }

    const favoriteUserAnime = await this.animesCharactersRepository.create({
      anime_id,
      character_id,
      role,
    });

    return favoriteUserAnime;
  }
}
