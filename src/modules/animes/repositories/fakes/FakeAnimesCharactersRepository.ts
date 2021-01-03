import ICreateAnimeCharacterDTO from '@modules/animes/dtos/ICreateAnimeCharacterDTO';
import IFindByIdAnimeCharacterDTO from '@modules/animes/dtos/IFindByIdAnimeCharacterDTO';
import AnimeCharacter from '@modules/animes/infra/typeorm/entities/AnimeCharacter';
import { v4 as uuid } from 'uuid';
import IAnimesCharactersRepository from '../IAnimesCharactersRepository';

export default class FakeAnimesCharactersRepository
  implements IAnimesCharactersRepository {
  private animesCharacters: AnimeCharacter[] = [];

  public async findByAnimeId(anime_id: string): Promise<AnimeCharacter[]> {
    return this.animesCharacters.filter(
      animeCharacter => animeCharacter.anime_id === anime_id,
    );
  }

  public async deleteById(id: string): Promise<AnimeCharacter> {
    const animeCharacterToRemove = this.animesCharacters.find(
      animeCharacter => animeCharacter.id === id,
    ) as AnimeCharacter;

    this.animesCharacters = this.animesCharacters.filter(
      animeCharacter => animeCharacter.id === id,
    );

    return animeCharacterToRemove;
  }

  public async findById(id: string): Promise<AnimeCharacter | undefined> {
    const findAnimeCharacter = this.animesCharacters.find(
      user => user.id === id,
    );

    return findAnimeCharacter;
  }

  public async findByAnimeIdAndCharacterId({
    character_id,
    anime_id,
  }: IFindByIdAnimeCharacterDTO): Promise<AnimeCharacter | undefined> {
    return this.animesCharacters.find(
      animeCharacter =>
        animeCharacter.character_id === character_id &&
        animeCharacter.anime_id === anime_id,
    );
  }

  public async create({
    anime_id,
    character_id,
    role,
  }: ICreateAnimeCharacterDTO): Promise<AnimeCharacter> {
    const animeCharacter = new AnimeCharacter();

    animeCharacter.id = uuid();
    animeCharacter.anime_id = anime_id;
    animeCharacter.character_id = character_id;
    animeCharacter.role = role;
    animeCharacter.created_at = new Date();
    animeCharacter.updated_at = new Date();

    this.animesCharacters.push(animeCharacter);

    return animeCharacter;
  }
}
