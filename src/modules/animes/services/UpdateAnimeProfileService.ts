import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import IAnimeRepository from '../repositories/IAnimesRepository';
import Anime from '../infra/typeorm/entities/Anime';

interface IRequest {
  animeId: string;
  avatarFilename: string;
}

@injectable()
class UpdateAnimeProfileService {
  constructor(
    @inject('AnimesRepository')
    private animesRepository: IAnimeRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ animeId, avatarFilename }: IRequest): Promise<Anime> {
    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new AppError('This anime does not exist', 401);
    }

    if (anime.profile) {
      await this.storageProvider.deleteFile(anime.profile);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    anime.profile = filename;

    await this.animesRepository.save(anime);

    return anime;
  }
}

export default UpdateAnimeProfileService;
