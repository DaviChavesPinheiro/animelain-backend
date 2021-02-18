import PageInfo from '@shared/infra/http/schemas/PageInfo.schema';
import { inject, injectable } from 'tsyringe';
import ICharactersRepository from '../repositories/ICharactersRepository';

interface IRequest {
  search?: string;
  page: number;
  perPage: number;
}

@injectable()
export default class ListCharactersPageInfoService {
  constructor(
    @inject('CharactersRepository')
    private charactersRepository: ICharactersRepository,
  ) {}

  public async execute({ search, page, perPage }: IRequest): Promise<PageInfo> {
    const charactersAmount = await this.charactersRepository.count({
      search,
      page,
      perPage,
    });

    return PageInfo.from(charactersAmount, page, perPage);
  }
}
