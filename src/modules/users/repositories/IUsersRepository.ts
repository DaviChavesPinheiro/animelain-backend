import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  find(data: IFindUserDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
}
