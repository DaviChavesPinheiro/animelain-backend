import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ search, page, perPage }: IRequest): Promise<User[]> {
    const users = this.usersRepository.find({
      search,
      page,
      perPage,
    });

    return users;
  }
}
