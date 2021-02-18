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
export default class CreateUserCharacterService {
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

    const checkIfUserCharacterAlreadyExist = await this.usersCharactersRepository.findOne(
      { characterId, userId, userCharacterStatus },
    );

    if (checkIfUserCharacterAlreadyExist) {
      throw new AppError('This User Character already exists');
    }

    const userCharacter = await this.usersCharactersRepository.create({
      characterId,
      userId,
      userCharacterStatus,
    });

    return userCharacter;
  }
}
