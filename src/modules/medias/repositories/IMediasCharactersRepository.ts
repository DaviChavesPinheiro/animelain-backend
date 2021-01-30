import ICreateMediaCharacterDTO from '../dtos/ICreateMediaCharacterDTO';
import IFindByIdMediaCharacterDTO from '../dtos/IFindByIdMediaCharacterDTO';
import MediaCharacter from '../infra/typeorm/entities/MediaCharacter';

export default interface IMediasCharactersRepository {
  findByMediaId(id: string): Promise<MediaCharacter[]>;
  findByMediaIdAndCharacterId(
    data: IFindByIdMediaCharacterDTO,
  ): Promise<MediaCharacter | undefined>;
  findById(id: string): Promise<MediaCharacter | undefined>;
  create(data: ICreateMediaCharacterDTO): Promise<MediaCharacter>;
  deleteById(id: string): Promise<void>;
  save(data: MediaCharacter): Promise<MediaCharacter>;
}
