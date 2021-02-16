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
export default class ListUserMediaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersMediasRepository')
    private usersMediasRepository: IUsersMediasRepository,
  ) {}

  public async execute({
    userId,
    mediaId,
    userMediaStatus,
  }: IRequest): Promise<UserMedia | undefined> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.usersMediasRepository.findOne({
      userId,
      mediaId,
      userMediaStatus,
    });
  }
}
