import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListUsersPageInfoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ search, page, perPage }: IRequest): Promise<PageInfo> {
    const usersAmount = await this.usersRepository.count({
      search,
      page,
      perPage,
    });

    return PageInfo.from(usersAmount, page, perPage);
  }
}
