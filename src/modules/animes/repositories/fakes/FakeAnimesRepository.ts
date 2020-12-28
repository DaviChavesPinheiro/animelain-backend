import ICreateAnimeDTO from '@modules/animes/dtos/ICreateAnimeDTO';
import Anime from '@modules/animes/infra/typeorm/entities/Anime';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import { v4 as uuid } from 'uuid';

export default class FakeAnimesRepository implements IAnimeRepository {
  private animes: Anime[] = [];

  public async find(): Promise<Anime[]> {
    return this.animes;
  }

  public async findByTitle(title: string): Promise<Anime | undefined> {
    const animeWithSameTitle = this.animes.find(anime => anime.title === title);

    return animeWithSameTitle;
  }

  public async create({
    title,
    description,
    episodesAmount,
  }: ICreateAnimeDTO): Promise<Anime> {
    const anime = new Anime();

    Object.assign(anime, {
      id: uuid(),
      title,
      description,
      episodesAmount,
    });

    this.animes.push(anime);

    return anime;
  }

  public async findById(id: string): Promise<Anime | undefined> {
    const animeWithSameId = this.animes.find(anime => anime.id === id);

    return animeWithSameId;
  }

  public async save(anime: Anime): Promise<Anime> {
    const mappedAnime = {
      ...anime,
      genres: anime.genres?.map(genre => ({
        ...genre,
        ...(!genre.id && { id: uuid() }),
      })),
    } as Anime;

    const findIndex = this.animes.findIndex(
      findAnime => findAnime.id === mappedAnime.id,
    );

    this.animes[findIndex] = mappedAnime;

    return mappedAnime;
  }

  public async deleteById(id: string): Promise<void> {
    const animesFiltered = this.animes.filter(anime => anime.id !== id);

    this.animes = animesFiltered;
  }
}
