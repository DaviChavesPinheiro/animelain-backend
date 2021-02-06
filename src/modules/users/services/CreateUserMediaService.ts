import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserMedia, {
  UserMediaStatus,
} from '../infra/typeorm/entities/UserMedia';
import IUsersMediasRepository from '../repositories/IUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  mediaId: string;
  userMediaStatus: UserMediaStatus;
}

@injectable()
export default class CreateUserMediaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('UsersMediasRepository')
    private usersMediasRepository: IUsersMediasRepository,
  ) {}

  public async execute({
    userId,
    mediaId,
    userMediaStatus,
  }: IRequest): Promise<UserMedia> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    if (!Object.values(UserMediaStatus).includes(userMediaStatus)) {
      throw new AppError('This User Media Status does not exist');
    }

    const checkIfUserMediaAlreadyExist = await this.usersMediasRepository.findOne(
      { mediaId, userId, userMediaStatus },
    );

    if (checkIfUserMediaAlreadyExist) {
      throw new AppError('This User Media already exists');
    }

    const userMedia = await this.usersMediasRepository.create({
      mediaId,
      userId,
      userMediaStatus,
    });

    return userMedia;
  }
}
