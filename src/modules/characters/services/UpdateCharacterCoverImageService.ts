import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import ICharactersRepository from '../repositories/ICharactersRepository';
import Character from '../infra/typeorm/entities/Character';

interface IRequest {
  characterId: string;
  coverImageName: string;
}

@injectable()
class UpdateCharacterCoverImageService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    characterId,
    coverImageName,
  }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(characterId);

    if (!character) {
      throw new AppError('This character does not exist', 401);
    }

    if (character.coverImage) {
      await this.storageProvider.deleteFile(character.coverImage);
    }

    const filename = await this.storageProvider.saveFile(coverImageName);

    character.coverImage = filename;

    await this.charactersRepository.save(character);

    return character;
  }
}

export default UpdateCharacterCoverImageService;
