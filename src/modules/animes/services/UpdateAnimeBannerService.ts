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
class UpdateAnimeBannerService {
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

    if (anime.banner) {
      await this.storageProvider.deleteFile(anime.banner);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    anime.banner = filename;

    await this.animesRepository.save(anime);

    return anime;
  }
}

export default UpdateAnimeBannerService;
