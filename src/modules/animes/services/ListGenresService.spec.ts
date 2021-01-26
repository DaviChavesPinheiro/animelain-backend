import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import FakeGenresRepository from '../repositories/fakes/FakeGenresRepository';
import IGenresRepository from '../repositories/IGenresRepository';
import ListGenresService from './ListAnimeGenresService';

let fakeAnimesRepository: IAnimeRepository;
let fakeGenresRepository: IGenresRepository;
let listGenresService: ListGenresService;

describe('ListGenresService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeGenresRepository = new FakeGenresRepository();
    listGenresService = new ListGenresService(
      fakeAnimesRepository,
      fakeGenresRepository,
    );
  });

  it('should not be able to list genres using a non existent anime', async () => {
    await expect(
      listGenresService.execute({
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list genres from a anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Some Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await fakeGenresRepository.create({
      anime_id: anime.id,
      category_id: 'seinen_category_id',
      score: 1,
    });
    await fakeGenresRepository.create({
      anime_id: anime.id,
      category_id: 'ecchi_category_id',
      score: 1,
    });

    const genres = await listGenresService.execute({
      anime_id: anime.id,
    });

    expect(genres).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          anime_id: anime.id,
          category_id: 'ecchi_category_id',
        }),
        expect.objectContaining({
          anime_id: anime.id,
          category_id: 'seinen_category_id',
        }),
      ]),
    );
  });
});
