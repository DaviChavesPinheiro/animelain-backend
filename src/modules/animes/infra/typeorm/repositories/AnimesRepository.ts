import { getRepository, Repository } from 'typeorm';
import ICreateAnimeDTO from '@modules/animes/dtos/ICreateAnimeDTO';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import IFindAnimeDTO from '@modules/animes/dtos/IFindAnimeDTO';
import getCurrentSeason from '@shared/utils/getCurrentSeason';
import IFindAnimeByIdDTO from '@modules/animes/dtos/IFindAnimeByIdDTO';
import Anime from '../entities/Anime';

export default class AnimesRepository implements IAnimeRepository {
  private ormRepository: Repository<Anime>;

  constructor() {
    this.ormRepository = getRepository(Anime);
  }

  public async find({ search, categories }: IFindAnimeDTO): Promise<Anime[]> {
    let query = this.ormRepository.createQueryBuilder('anime');

    if (search) {
      query = query.where('anime.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (categories?.length) {
      query = query
        .leftJoin('anime.genres', 'genre')
        .leftJoin('genre.category', 'category')
        .andWhere('category.id IN (:...categoriesIds)', {
          categoriesIds: categories,
        });
    }

    return query.getMany();
  }

  public async findByTitle(title: string): Promise<Anime | undefined> {
    const findedAnime = await this.ormRepository.findOne({ where: { title } });

    return findedAnime;
  }

  public async create({
    title,
    description,
    episodesAmount,
    created_by_id,
  }: ICreateAnimeDTO): Promise<Anime> {
    const anime = this.ormRepository.create({
      title,
      description,
      episodesAmount,
      created_by_id,
    });

    await this.ormRepository.save(anime);

    return anime;
  }

  public async findById({
    id,
    user_id,
  }: IFindAnimeByIdDTO): Promise<Anime | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('anime')
      .where('anime.id = :id', { id })
      .leftJoin('anime.genres', 'genre')
      .addSelect(['genre.id', 'genre.score'])
      .leftJoin('genre.category', 'category')
      .addSelect(['category.id', 'category.name']);

    // if (user_id) {
    //   query = query
    //     .leftJoin(
    //       'anime.favorite_users',
    //       'favorite_user',
    //       'favorite_user.id = :user_id',
    //       {
    //         user_id,
    //       },
    //     )
    //     .addSelect(['favorite_user.id']);
    // }

    return query.getOne();
  }

  public async save(data: Anime): Promise<Anime> {
    return this.ormRepository.save(data);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findNews(): Promise<Anime[]> {
    const today = new Date();
    today.setDate(today.getDate() - 7);

    const query = this.ormRepository
      .createQueryBuilder('anime')
      .where('anime.created_at > :week_ago', {
        week_ago: today.toLocaleString(),
      });

    return query.getMany();
  }

  public async findInSeason(): Promise<Anime[]> {
    const today = new Date();
    const currentSeason = getCurrentSeason();

    const currentSeasonStart = new Date(
      today.getFullYear(),
      (currentSeason - 1) * 4,
      1,
      0,
      0,
      0,
    );

    const query = this.ormRepository
      .createQueryBuilder('anime')
      .where('anime.created_at > :currentSeasonStart', {
        currentSeasonStart: currentSeasonStart.toLocaleString(),
      });

    return query.getMany();
  }
}
