import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFavoriteUsersMediasRepository from '../repositories/IFavoriteUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  mediaId: string;
}

@injectable()
export default class ToggleFavoriteUserMediaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('FavoriteUsersMediasRepository')
    private favoriteUsersMediasRepository: IFavoriteUsersMediasRepository,
  ) {}

  public async execute({ userId, mediaId }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    const favoriteUserMedia = await this.favoriteUsersMediasRepository.findByUserIdAndMediaId(
      { mediaId, userId },
    );

    if (favoriteUserMedia) {
      await this.favoriteUsersMediasRepository.deleteById(favoriteUserMedia.id);
      return false;
    }
    await this.favoriteUsersMediasRepository.create({
      mediaId,
      userId,
    });

    return true;
  }
}
