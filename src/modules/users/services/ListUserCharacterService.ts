import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserCharacter, {
  UserCharacterStatus,
} from '../infra/typeorm/entities/UserCharacter';
import IUsersCharactersRepository from '../repositories/IUsersCharactersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  characterId: string;
  userCharacterStatus: UserCharacterStatus;
}

@injectable()
export default class ListUserCharacterService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersCharactersRepository')
    private usersCharactersRepository: IUsersCharactersRepository,
  ) {}

  public async execute({
    userId,
    characterId,
    userCharacterStatus,
  }: IRequest): Promise<UserCharacter | undefined> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return this.usersCharactersRepository.findOne({
      userId,
      characterId,
      userCharacterStatus,
    });
  }
}
