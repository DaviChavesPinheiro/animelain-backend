import ICharacterRepository from '@modules/characters/repositories/ICharactersRepository';
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
export default class DeleteUserCharacterService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CharactersRepository')
    private charactersRepository: ICharacterRepository,

    @inject('UsersCharactersRepository')
    private usersCharactersRepository: IUsersCharactersRepository,
  ) {}

  public async execute({
    userId,
    characterId,
    userCharacterStatus,
  }: IRequest): Promise<UserCharacter> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const character = await this.charactersRepository.findById(characterId);

    if (!character) {
      throw new AppError('Character does not exist');
    }

    const userCharacter = await this.usersCharactersRepository.findOne({
      characterId,
      userId,
      userCharacterStatus,
    });

    if (!userCharacter) {
      throw new AppError('This User Character does not exists');
    }

    await this.usersCharactersRepository.deleteById(userCharacter.id);

    return userCharacter;
  }
}
