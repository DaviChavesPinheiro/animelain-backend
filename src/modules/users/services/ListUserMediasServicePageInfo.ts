import AppError from '@shared/errors/AppError';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import { UserMediaStatus } from '../infra/typeorm/entities/UserMedia';
import IUsersMediasRepository from '../repositories/IUsersMediasRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  userMediaStatus?: UserMediaStatus;
  page: number;
  perPage: number;
}

@injectable()
export default class ListUserMediasServicePageInfo {
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
  }: IRequest): Promise<PageInfo> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const userMediasAmount = await this.usersMediasRepository.count({
      userId,
      userMediaStatus,
      page,
      perPage,
    });

    return {
      total: userMediasAmount,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(userMediasAmount / perPage),
      hasNextPage: page < Math.ceil(userMediasAmount / perPage),
    };
  }
}
