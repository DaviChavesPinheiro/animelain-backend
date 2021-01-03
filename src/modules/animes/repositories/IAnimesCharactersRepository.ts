import ICreateAnimeCharacterDTO from '../dtos/ICreateAnimeCharacterDTO';
import IFindByIdAnimeCharacterDTO from '../dtos/IFindByIdAnimeCharacterDTO';
import AnimeCharacter from '../infra/typeorm/entities/AnimeCharacter';

export default interface IAnimesCharactersRepository {
  findByAnimeId(id: string): Promise<AnimeCharacter[]>;
  findByAnimeIdAndCharacterId(
    data: IFindByIdAnimeCharacterDTO,
  ): Promise<AnimeCharacter | undefined>;
  findById(id: string): Promise<AnimeCharacter | undefined>;
  create(data: ICreateAnimeCharacterDTO): Promise<AnimeCharacter>;
  deleteById(id: string): Promise<AnimeCharacter>;
}
