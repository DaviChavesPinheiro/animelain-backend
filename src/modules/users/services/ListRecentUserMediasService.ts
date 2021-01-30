import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RecentUserMedia from '../infra/typeorm/entities/RecentUserMedia';
import IRecentUsersMediasRepository from '../repositories/IRecentUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class ListRecentUserMediasService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RecentUsersMediasRepository')
    private recentUsersMediasRepository: IRecentUsersMediasRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<RecentUserMedia[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.recentUsersMediasRepository.findByUserId(userId);
  }
}
