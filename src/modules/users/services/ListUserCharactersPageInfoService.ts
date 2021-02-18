import AppError from '@shared/errors/AppError';
import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import { UserCharacterStatus } from '../infra/typeorm/entities/UserCharacter';
import IUsersCharactersRepository from '../repositories/IUsersCharactersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  userCharacterStatus?: UserCharacterStatus;
  page: number;
  perPage: number;
}

@injectable()
export default class ListUserCharactersPageInfoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersCharactersRepository')
    private usersCharactersRepository: IUsersCharactersRepository,
  ) {}

  public async execute({
    userId,
    userCharacterStatus,
    page,
    perPage,
  }: IRequest): Promise<PageInfo> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const userCharactersAmount = await this.usersCharactersRepository.count({
      userId,
      userCharacterStatus,
      page,
      perPage,
    });

    return PageInfo.from(userCharactersAmount, page, perPage);
  }
}
