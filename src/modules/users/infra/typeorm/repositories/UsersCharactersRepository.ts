import ICreateUserCharacterDTO from '@modules/users/dtos/ICreateUserCharacterDTO';
import IFindOneUserCharacterDTO from '@modules/users/dtos/IFindOneUserCharacterDTO';
import IFindUserCharacterDTO from '@modules/users/dtos/IFindUserCharacterDTO';
import IUsersCharactersRepository from '@modules/users/repositories/IUsersCharactersRepository';
import { Repository, getRepository } from 'typeorm';
import UserCharacter from '../entities/UserCharacter';

class UsersCharactersRepository implements IUsersCharactersRepository {
  private ormRepository: Repository<UserCharacter>;

  constructor() {
    this.ormRepository = getRepository(UserCharacter);
  }

  public async findByUserId(userId: string): Promise<UserCharacter[]> {
    const query = this.ormRepository
      .createQueryBuilder('userCharacter')
      .where('userCharacter.userId = :userId', { userId });

    return query.getMany();
  }

  public async findById(id: string): Promise<UserCharacter | undefined> {
    const userCharacter = await this.ormRepository.findOne(id);

    return userCharacter;
  }

  public async findOne({
    userId,
    characterId,
    userCharacterStatus,
  }: IFindOneUserCharacterDTO): Promise<UserCharacter | undefined> {
    const userCharacter = await this.ormRepository.findOne({
      userId,
      characterId,
      userCharacterStatus,
    });

    return userCharacter;
  }

  public async find({
    userId,
    userCharacterStatus,
    page,
    perPage,
  }: IFindUserCharacterDTO): Promise<UserCharacter[]> {
    let query = this.ormRepository
      .createQueryBuilder('userCharacter')
      .where('userCharacter.userId = :userId', { userId });

    if (userCharacterStatus) {
      query = query.andWhere(
        'userCharacter.userCharacterStatus = :userCharacterStatus',
        {
          userCharacterStatus,
        },
      );
    }

    return query
      .take(perPage)
      .skip((page - 1) * perPage)
      .getMany();
  }

  public async count({
    userId,
    userCharacterStatus,
  }: IFindUserCharacterDTO): Promise<number> {
    let query = this.ormRepository
      .createQueryBuilder('userCharacter')
      .where('userCharacter.userId = :userId', { userId });

    if (userCharacterStatus) {
      query = query.andWhere(
        'userCharacter.userCharacterStatus = :userCharacterStatus',
        {
          userCharacterStatus,
        },
      );
    }

    return query.getCount();
  }

  public async create({
    userId,
    characterId,
    userCharacterStatus,
  }: ICreateUserCharacterDTO): Promise<UserCharacter> {
    const userCharacter = this.ormRepository.create({
      userId,
      characterId,
      userCharacterStatus,
    });

    await this.ormRepository.save(userCharacter);

    return userCharacter;
  }

  public async deleteById(id: string): Promise<UserCharacter> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const userCharacter = await this.ormRepository.remove(entityToRemove);

    return userCharacter;
  }
}

export default UsersCharactersRepository;
