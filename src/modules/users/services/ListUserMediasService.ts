import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserMedia, {
  UserMediaStatus,
} from '../infra/typeorm/entities/UserMedia';
import IUsersMediasRepository from '../repositories/IUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  userMediaStatus?: UserMediaStatus;
  page: number;
  perPage: number;
}

@injectable()
export default class ListUserMediasService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersMediasRepository')
    private usersMediasRepository: IUsersMediasRepository,
  ) {}

  public async execute({
    userId,
    userMediaStatus,
    page,
    perPage,
  }: IRequest): Promise<UserMedia[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.usersMediasRepository.find({
      userId,
      userMediaStatus,
      page,
      perPage,
    });
  }
}
