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
    episodesAmount,
  }: IFindMediaDTO): Promise<Media[]> {
    let query = this.ormRepository.createQueryBuilder('media');

    if (type) {
      query = query.where('media.type = :type', {
        type,
      });
    }

    if (search) {
      query = query.where('media.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (title) {
      query = query.where('media.title = :title', {
        title,
      });
    }

    if (episodesAmount) {
      query = query.where('media.episodesAmount = :episodesAmount', {
        episodesAmount,
      });
    }

    return query.getMany();
  }

  public async findByTitle(title: string): Promise<Media | undefined> {
    const findedMedia = await this.ormRepository.findOne({ where: { title } });

    return findedMedia;
  }

  public async create({
    type,
    title,
    description,
    episodesAmount,
    createdById,
  }: ICreateMediaDTO): Promise<Media> {
    const media = this.ormRepository.create({
      type,
      title,
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
