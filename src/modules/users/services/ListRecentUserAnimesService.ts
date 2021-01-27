import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RecentUserAnime from '../infra/typeorm/entities/RecentUserAnime';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class ListRecentUserAnimesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RecentUsersAnimesRepository')
    private recentUsersAnimesRepository: IRecentUsersAnimesRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<RecentUserAnime[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.recentUsersAnimesRepository.findByUserId(userId);
  }
}
