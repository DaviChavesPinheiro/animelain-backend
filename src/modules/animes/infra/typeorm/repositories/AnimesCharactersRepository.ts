import ICreateAnimeCharacterDTO from '@modules/animes/dtos/ICreateAnimeCharacterDTO';
import IFindByIdAnimeCharacterDTO from '@modules/animes/dtos/IFindByIdAnimeCharacterDTO';
import IAnimesCharactersRepository from '@modules/animes/repositories/IAnimesCharactersRepository';
import { Repository, getRepository } from 'typeorm';
import AnimeCharacter from '../entities/AnimeCharacter';

class AnimesCharactersRepository implements IAnimesCharactersRepository {
  private ormRepository: Repository<AnimeCharacter>;

  constructor() {
    this.ormRepository = getRepository(AnimeCharacter);
  }

  public async findByAnimeId(animeId: string): Promise<AnimeCharacter[]> {
    const animeCharacters = await this.ormRepository.find({
      animeId,
    });

    return animeCharacters;
  }

  public async findByAnimeIdAndCharacterId({
    animeId,
    characterId,
  }: IFindByIdAnimeCharacterDTO): Promise<AnimeCharacter | undefined> {
    const animeCharacter = await this.ormRepository.findOne({
      animeId,
      characterId,
    });

    return animeCharacter;
  }

  public async findById(id: string): Promise<AnimeCharacter | undefined> {
    const animeCharacter = await this.ormRepository.findOne(id);

    return animeCharacter;
  }

  public async create({
    animeId,
    characterId,
    role,
  }: ICreateAnimeCharacterDTO): Promise<AnimeCharacter> {
    const animeCharacter = this.ormRepository.create({
      animeId,
      characterId,
      role,
    });

    return this.ormRepository.save(animeCharacter);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(data: AnimeCharacter): Promise<AnimeCharacter> {
    return this.ormRepository.save(data);
  }
}

export default AnimesCharactersRepository;
