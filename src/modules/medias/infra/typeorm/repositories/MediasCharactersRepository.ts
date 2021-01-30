import ICreateMediaCharacterDTO from '@modules/medias/dtos/ICreateMediaCharacterDTO';
import IFindByIdMediaCharacterDTO from '@modules/medias/dtos/IFindByIdMediaCharacterDTO';
import IMediasCharactersRepository from '@modules/medias/repositories/IMediasCharactersRepository';
import { Repository, getRepository } from 'typeorm';
import MediaCharacter, { CharacterRole } from '../entities/MediaCharacter';

class MediasCharactersRepository implements IMediasCharactersRepository {
  private ormRepository: Repository<MediaCharacter>;

  constructor() {
    this.ormRepository = getRepository(MediaCharacter);
  }

  public async findByMediaId(mediaId: string): Promise<MediaCharacter[]> {
    const mediaCharacters = await this.ormRepository.find({
      mediaId,
    });

    return mediaCharacters;
  }

  public async findByMediaIdAndCharacterId({
    mediaId,
    characterId,
  }: IFindByIdMediaCharacterDTO): Promise<MediaCharacter | undefined> {
    const mediaCharacter = await this.ormRepository.findOne({
      mediaId,
      characterId,
    });

    return mediaCharacter;
  }

  public async findById(id: string): Promise<MediaCharacter | undefined> {
    const mediaCharacter = await this.ormRepository.findOne(id);

    return mediaCharacter;
  }

  public async create({
    mediaId,
    characterId,
    role,
  }: ICreateMediaCharacterDTO): Promise<MediaCharacter> {
    const mediaCharacter = this.ormRepository.create({
      mediaId,
      characterId,
      role: role as CharacterRole,
    });

    return this.ormRepository.save(mediaCharacter);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(data: MediaCharacter): Promise<MediaCharacter> {
    return this.ormRepository.save(data);
  }
}

export default MediasCharactersRepository;
