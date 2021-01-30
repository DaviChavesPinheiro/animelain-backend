import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FavoriteUserMedia from '../infra/typeorm/entities/FavoriteUserMedia';
import IFavoriteUsersMediasRepository from '../repositories/IFavoriteUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  mediaId: string;
}

@injectable()
export default class RemoveFavoriteUserMediaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('FavoriteUsersMediasRepository')
    private favoriteUsersMediasRepository: IFavoriteUsersMediasRepository,
  ) {}

  public async execute({
    userId,
    mediaId,
  }: IRequest): Promise<FavoriteUserMedia> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    const checkIfFavoriteUserMediaAlreadyExist = await this.favoriteUsersMediasRepository.findByUserIdAndMediaId(
      { mediaId, userId },
    );

    if (!checkIfFavoriteUserMediaAlreadyExist) {
      throw new AppError('This Favorite User Media does not exists');
    }

    const favoriteUserMedia = await this.favoriteUsersMediasRepository.deleteById(
      checkIfFavoriteUserMediaAlreadyExist.id,
    );

    return favoriteUserMedia;
  }
}
