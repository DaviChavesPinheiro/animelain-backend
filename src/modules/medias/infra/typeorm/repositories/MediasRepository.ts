import { getRepository, Repository } from 'typeorm';
import ICreateMediaDTO from '@modules/medias/dtos/ICreateMediaDTO';
import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import IFindMediaDTO from '@modules/medias/dtos/IFindMediaDTO';
import getCurrentSeason from '@shared/utils/getCurrentSeason';
import Media from '../entities/Media';

export default class MediasRepository implements IMediaRepository {
  private ormRepository: Repository<Media>;

  constructor() {
    this.ormRepository = getRepository(Media);
  }

  public async find({
    type,
    search,
    title,
    season,
    categoryIn,
    characterIn,
    episodesAmount,
    page,
    perPage,
  }: IFindMediaDTO): Promise<Media[]> {
    let query = this.ormRepository.createQueryBuilder('media');

    if (type) {
      query = query.andWhere('media.type = :type', {
        type,
      });
    }

    if (search) {
      query = query.andWhere('media.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (title) {
      query = query.andWhere('media.title = :title', {
        title,
      });
    }

    if (season) {
      query = query.andWhere('media.season = :season', {
        season,
      });
    }

    if (categoryIn) {
      query = query
        .leftJoin('media.mediasCategories', 'mediaCategory')
        .leftJoin('mediaCategory.category', 'category')
        .andWhere('category.id IN (:...categoryIn)', {
          categoryIn,
        });
    }

    if (characterIn) {
      query = query
        .leftJoin('media.mediasCharacters', 'mediaCharacter')
        .leftJoin('mediaCharacter.character', 'character')
        .andWhere('character.id IN (:...characterIn)', {
          characterIn,
        });
    }

    if (episodesAmount) {
      query = query.where('media.episodesAmount = :episodesAmount', {
        episodesAmount,
      });
    }

    return query
      .skip((page - 1) * perPage)
      .take(perPage)
      .getMany();
  }

  public async count({
    type,
    search,
    title,
    season,
    categoryIn,
    characterIn,
    episodesAmount,
  }: IFindMediaDTO): Promise<number> {
    let query = this.ormRepository.createQueryBuilder('media');

    if (type) {
      query = query.andWhere('media.type = :type', {
        type,
      });
    }

    if (search) {
      query = query.andWhere('media.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (title) {
      query = query.andWhere('media.title = :title', {
        title,
      });
    }

    if (season) {
      query = query.andWhere('media.season = :season', {
        season,
      });
    }

    if (categoryIn) {
      query = query
        .leftJoin('media.mediasCategories', 'mediaCategory')
        .leftJoin('mediaCategory.category', 'category')
        .andWhere('category.id IN (:...categoryIn)', {
          categoryIn,
        });
    }

    if (characterIn) {
      query = query
        .leftJoin('media.mediasCharacters', 'mediaCharacter')
        .leftJoin('mediaCharacter.character', 'character')
        .andWhere('character.id IN (:...characterIn)', {
          characterIn,
        });
    }

    if (episodesAmount) {
      query = query.where('media.episodesAmount = :episodesAmount', {
        episodesAmount,
      });
    }

    return query.getCount();
  }

  public async findByTitle(title: string): Promise<Media | undefined> {
    const findedMedia = await this.ormRepository.findOne({ where: { title } });

    return findedMedia;
  }

  public async create({
    type,
    title,
    season,
    description,
    episodesAmount,
    createdById,
  }: ICreateMediaDTO): Promise<Media> {
    const media = this.ormRepository.create({
      type,
      title,
      season,
      description,
      episodesAmount,
      createdById,
    });

    await this.ormRepository.save(media);

    return media;
  }

  public async findById(id: string): Promise<Media | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('media')
      .where('media.id = :id', { id });

    return query.getOne();
  }

  public async save(data: Media): Promise<Media> {
    return this.ormRepository.save(data);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  // todo: delete findNews and findInSeason. Create just a "findByDateBeetween(dateA, dateB)"
  public async findNews(): Promise<Media[]> {
    const today = new Date();
    today.setDate(today.getDate() - 7);

    const query = this.ormRepository
      .createQueryBuilder('media')
      .where('media.createdAt > :week_ago', {
        week_ago: today.toLocaleString(),
      });

    return query.getMany();
  }

  public async findInSeason(): Promise<Media[]> {
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
      .createQueryBuilder('media')
      .where('media.createdAt > :currentSeasonStart', {
        currentSeasonStart: currentSeasonStart.toLocaleString(),
      });

    return query.getMany();
  }
}
