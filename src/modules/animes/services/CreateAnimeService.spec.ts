import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import CreateAnimeService from './CreateAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createAnimeService: CreateAnimeService;

describe('CreateAnimeService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    createAnimeService = new CreateAnimeService(
      fakeAnimesRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to create an anime', async () => {
    const anime = await createAnimeService.execute({
      title: 'One Piece',
      description: 'Blah',
      episodesAmount: 10,
      created_by_id: 'some-uuid-id',
      genres: [],
    });

    expect(anime).toHaveProperty('id');
  });

  it('should not be able to create an anime with negative episodes', async () => {
    await expect(
      createAnimeService.execute({
        title: 'Naruto',
        description: 'Blah blah',
        episodesAmount: -500,
        created_by_id: 'some-uuid-id',
        genres: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two or more animes with same title', async () => {
    await createAnimeService.execute({
      title: 'Naruto',
      description: 'Blah blah',
      episodesAmount: 500,
      created_by_id: 'some-uuid-id',
      genres: [],
    });

    await expect(
      createAnimeService.execute({
        title: 'Naruto',
        description: 'Blah blah',
        episodesAmount: 500,
        created_by_id: 'some-uuid-id',
        genres: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an anime with a non existing category', async () => {
    await expect(
      createAnimeService.execute({
        title: 'Naruto',
        description: 'Blah blah',
        episodesAmount: 500,
        created_by_id: 'some-uuid-id',
        genres: [
          {
            score: 10,
            category_id: 'some-uuid-id',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
