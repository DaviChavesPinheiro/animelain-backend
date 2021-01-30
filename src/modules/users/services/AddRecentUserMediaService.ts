import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RecentUserMedia from '../infra/typeorm/entities/RecentUserMedia';
import IRecentUsersMediasRepository from '../repositories/IRecentUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  mediaId: string;
}

@injectable()
export default class AddRecentUserMediaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('RecentUsersMediasRepository')
    private recentUsersMediasRepository: IRecentUsersMediasRepository,
  ) {}

  public async execute({
    userId,
    mediaId,
  }: IRequest): Promise<RecentUserMedia> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    const checkIfRecentUserMediaAlreadyExist = await this.recentUsersMediasRepository.findByUserIdAndMediaId(
      { mediaId, userId },
    );

    if (checkIfRecentUserMediaAlreadyExist) {
      throw new AppError('This Recent User Media already exists');
    }

    const recentUserMedia = await this.recentUsersMediasRepository.create({
      mediaId,
      userId,
    });

    return recentUserMedia;
  }
}
