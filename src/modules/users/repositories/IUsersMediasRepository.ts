import ICreateUserMediaDTO from '../dtos/ICreateUserMediaDTO';
import IFindOneUserMediaDTO from '../dtos/IFindOneUserMediaDTO';
import IFindUserMediaDTO from '../dtos/IFindUserMediaDTO';
import UserMedia from '../infra/typeorm/entities/UserMedia';

export default interface IUsersMediasRepository {
  findById(id: string): Promise<UserMedia | undefined>;
  findOne(data: IFindOneUserMediaDTO): Promise<UserMedia | undefined>;
  find(data: IFindUserMediaDTO): Promise<UserMedia[]>;
  create(data: ICreateUserMediaDTO): Promise<UserMedia>;
  deleteById(id: string): Promise<UserMedia>;
}
