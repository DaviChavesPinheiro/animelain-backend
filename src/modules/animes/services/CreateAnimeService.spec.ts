import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import CreateAnimeService from './CreateAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAnimeService: CreateAnimeService;

describe('CreateAnimeService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAnimeService = new CreateAnimeService(
      fakeAnimesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create an anime', async () => {
    const anime = await createAnimeService.execute({
      title: 'One Piece',
      description: 'Blah',
      episodesAmount: 10,
      created_by_id: 'some-uuid-id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two or more animes with same title', async () => {
    await createAnimeService.execute({
      title: 'Naruto',
      description: 'Blah blah',
      episodesAmount: 500,
      created_by_id: 'some-uuid-id',
    });

    await expect(
      createAnimeService.execute({
        title: 'Naruto',
        description: 'Blah blah',
        episodesAmount: 500,
        created_by_id: 'some-uuid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
