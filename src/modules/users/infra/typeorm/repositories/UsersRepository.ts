import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find({ search, page, perPage }: IFindUserDTO): Promise<User[]> {
    let query = this.ormRepository.createQueryBuilder('user');

    if (search) {
      query = query.andWhere('user.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    return query.skip(page).take(perPage).getMany();
  }

  public async findById(id: string): Promise<User | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });

    return query.getOne();
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    return this.ormRepository.save(user);
  }

  public async save(userData: User): Promise<User> {
    return this.ormRepository.save(userData);
  }
}

export default UsersRepository;
