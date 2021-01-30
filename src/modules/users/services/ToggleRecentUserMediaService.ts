import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRecentUsersMediasRepository from '../repositories/IRecentUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  mediaId: string;
}

@injectable()
export default class ToggleRecentUserMediaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('RecentUsersMediasRepository')
    private recentUsersMediasRepository: IRecentUsersMediasRepository,
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

    const recentUserMedia = await this.recentUsersMediasRepository.findByUserIdAndMediaId(
      { mediaId, userId },
    );

    if (recentUserMedia) {
      await this.recentUsersMediasRepository.deleteById(recentUserMedia.id);

      return false;
    }

    await this.recentUsersMediasRepository.create({
      mediaId,
      userId,
    });

    return true;
  }
}
