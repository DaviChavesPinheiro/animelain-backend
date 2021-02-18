import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserCharacter, {
  UserCharacterStatus,
} from '../infra/typeorm/entities/UserCharacter';
import IUsersCharactersRepository from '../repositories/IUsersCharactersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  userCharacterStatus?: UserCharacterStatus;
  page: number;
  perPage: number;
}

@injectable()
export default class ListUserCharactersService {
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
  }: IRequest): Promise<UserCharacter[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.usersCharactersRepository.find({
      userId,
      userCharacterStatus,
      page,
      perPage,
    });
  }
}
