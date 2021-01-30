import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MediaCharacter from '../infra/typeorm/entities/MediaCharacter';
import IMediasCharactersRepository from '../repositories/IMediasCharactersRepository';

interface IRequest {
  mediaId: string;
  characterId: string;
  role?: string;
}

@injectable()
export default class AddMediaCharacterService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,

    @inject('MediasCharactersRepository')
    private mediasCharactersRepository: IMediasCharactersRepository,
  ) {}

  public async execute({
    characterId,
    mediaId,
    role,
  }: IRequest): Promise<MediaCharacter> {
    const character = await this.charactersRepository.findById(characterId);

    if (!character) {
      throw new AppError('Character does not exist');
    }

    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    const checkIfMediaCharacterAlreadyExist = await this.mediasCharactersRepository.findByMediaIdAndCharacterId(
      { mediaId, characterId },
    );

    if (checkIfMediaCharacterAlreadyExist) {
      throw new AppError('This Media Character already exists');
    }

    const mediaCharacter = await this.mediasCharactersRepository.create({
      mediaId,
      characterId,
      role,
    });

    return mediaCharacter;
  }
}
