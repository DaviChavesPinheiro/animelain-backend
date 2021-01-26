import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import FakeGenresRepository from '../repositories/fakes/FakeGenresRepository';
import IGenresRepository from '../repositories/IGenresRepository';
import RemoveGenreService from './RemoveGenreAnimeService';

let fakeCategoriesRepository: ICategoriesRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeGenresRepository: IGenresRepository;
let removeGenreService: RemoveGenreService;

describe('RemoveGenreService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeGenresRepository = new FakeGenresRepository();
    removeGenreService = new RemoveGenreService(
      fakeAnimesRepository,
      fakeCategoriesRepository,
      fakeGenresRepository,
    );
  });

  it('should not be able to remove a new genre using a non existent category', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_category_id',
    });

    await expect(
      removeGenreService.execute({
        anime_id: anime.id,
        category_id: 'some-non-existent-category-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a new genre using a non existent anime', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    await expect(
      removeGenreService.execute({
        category_id: category.id,
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a non existent genre', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_category_id',
    });

    await expect(
      removeGenreService.execute({
        category_id: category.id,
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove a new genre', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_category_id',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const createdGenre = await fakeGenresRepository.create({
      category_id: category.id,
      anime_id: anime.id,
      score: 1,
    });

    const removedGenre = await removeGenreService.execute({
      category_id: category.id,
      anime_id: anime.id,
    });

    expect(removedGenre.id).toBe(createdGenre.id);
  });
});
