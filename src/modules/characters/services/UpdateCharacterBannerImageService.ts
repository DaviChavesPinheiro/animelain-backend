import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import ICharactersRepository from '../repositories/ICharactersRepository';
import Character from '../infra/typeorm/entities/Character';

interface IRequest {
  characterId: string;
  bannerImageName: string;
}

@injectable()
class UpdateCharacterBannerImageService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    characterId,
    bannerImageName,
  }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(characterId);

    if (!character) {
      throw new AppError('This character does not exist', 401);
    }

    if (character.bannerImage) {
      await this.storageProvider.deleteFile(character.bannerImage);
    }

    const filename = await this.storageProvider.saveFile(bannerImageName);

    character.bannerImage = filename;

    await this.charactersRepository.save(character);

    return character;
  }
}

export default UpdateCharacterBannerImageService;
