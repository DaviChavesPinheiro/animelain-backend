import ICreateFavoriteUserAnimeDTO from '@modules/users/dtos/ICreateFavoriteUserAnimeDTO';
import IFindByIdFavoriteUserAnimeDTO from '@modules/users/dtos/IFindByIdFavoriteUserAnimeDTO';
import IFavoriteUsersAnimesRepository from '@modules/users/repositories/IFavoriteUsersAnimesRepository';
import { Repository, getRepository } from 'typeorm';
import FavoriteUserAnime from '../entities/FavoriteUserAnime';

class FavoriteUsersAnimesRepository implements IFavoriteUsersAnimesRepository {
  private ormRepository: Repository<FavoriteUserAnime>;

  constructor() {
    this.ormRepository = getRepository(FavoriteUserAnime);
  }

  public async findByUserId(user_id: string): Promise<FavoriteUserAnime[]> {
    const query = this.ormRepository
      .createQueryBuilder('favoriteUserAnime')
      .where('favoriteUserAnime.user_id = :user_id', { user_id });

    return query.getMany();
  }

  public async findByUserIdAndAnimeId({
    user_id,
    anime_id,
  }: IFindByIdFavoriteUserAnimeDTO): Promise<FavoriteUserAnime | undefined> {
    const favoriteUserAnime = await this.ormRepository.findOne({
      user_id,
      anime_id,
    });

    return favoriteUserAnime;
  }

  public async findById(id: string): Promise<FavoriteUserAnime | undefined> {
    const favoriteUserAnime = await this.ormRepository.findOne(id);

    return favoriteUserAnime;
  }

  public async create({
    user_id,
    anime_id,
  }: ICreateFavoriteUserAnimeDTO): Promise<FavoriteUserAnime> {
    const favoriteUserAnime = this.ormRepository.create({ user_id, anime_id });

    await this.ormRepository.save(favoriteUserAnime);

    return favoriteUserAnime;
  }

  public async deleteById(id: string): Promise<FavoriteUserAnime> {
    const entityToRemove = await this.ormRepository.findOneOrFail(id);

    const favoriteUserAnime = await this.ormRepository.remove(entityToRemove);

    return favoriteUserAnime;
  }
}

export default FavoriteUsersAnimesRepository;
