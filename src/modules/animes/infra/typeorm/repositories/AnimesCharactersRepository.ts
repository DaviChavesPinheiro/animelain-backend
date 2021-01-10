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

  public async findByAnimeId(anime_id: string): Promise<AnimeCharacter[]> {
    const animeCharacters = await this.ormRepository.find({
      anime_id,
    });

    return animeCharacters;
  }

  public async findByAnimeIdAndCharacterId({
    anime_id,
    character_id,
  }: IFindByIdAnimeCharacterDTO): Promise<AnimeCharacter | undefined> {
    const animeCharacter = await this.ormRepository.findOne({
      anime_id,
      character_id,
    });

    return animeCharacter;
  }

  public async findById(id: string): Promise<AnimeCharacter | undefined> {
    const animeCharacter = await this.ormRepository.findOne(id);

    return animeCharacter;
  }

  public async create({
    anime_id,
    character_id,
  }: ICreateAnimeCharacterDTO): Promise<AnimeCharacter> {
    const animeCharacter = this.ormRepository.create({
      anime_id,
      character_id,
    });

    await this.ormRepository.save(animeCharacter);

    return animeCharacter;
  }

  public async deleteById(id: string): Promise<AnimeCharacter> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const animeCharacter = await this.ormRepository.remove(entityToRemove);

    return animeCharacter;
  }

  public async save(data: AnimeCharacter): Promise<AnimeCharacter> {
    return this.ormRepository.save(data);
  }
}

export default AnimesCharactersRepository;
