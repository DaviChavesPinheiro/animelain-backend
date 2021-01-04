import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import FakeGenresRepository from '../repositories/fakes/FakeGenresRepository';
import IGenresRepository from '../repositories/IGenresRepository';
import AddGenreService from './AddGenreService';

let fakeCategoriesRepository: ICategoriesRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeGenresRepository: IGenresRepository;
let addGenreService: AddGenreService;

describe('AddGenreService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeGenresRepository = new FakeGenresRepository();
    addGenreService = new AddGenreService(
      fakeAnimesRepository,
      fakeCategoriesRepository,
      fakeGenresRepository,
    );
  });

  it('should not be able to add a new genre using a non existent category', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_category_id',
    });

    await expect(
      addGenreService.execute({
        anime_id: anime.id,
        category_id: 'some-non-existent-category-id',
        score: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a new genre using a non existent anime', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    await expect(
      addGenreService.execute({
        category_id: category.id,
        anime_id: 'some-non-existent-anime-id',
        score: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a duplicated genre', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_category_id',
    });

    await addGenreService.execute({
      category_id: category.id,
      anime_id: anime.id,
      score: 1,
    });

    await expect(
      addGenreService.execute({
        category_id: category.id,
        anime_id: anime.id,
        score: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new genre', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_category_id',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const genre = await addGenreService.execute({
      category_id: category.id,
      anime_id: anime.id,
      score: 1,
    });

    expect(genre).toHaveProperty('id');
  });
});
