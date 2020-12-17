import 'reflect-metadata';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import CreateAnimeService from './CreateAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let createAnimeService: CreateAnimeService;

describe('CreateAnimeService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    createAnimeService = new CreateAnimeService(fakeAnimesRepository);
  });

  it('should be able to create an anime', async () => {
    const anime = await createAnimeService.execute({
      title: 'One Piece',
      description: 'Blah',
      episodesAmount: 10,
    });

    expect(anime).toHaveProperty('id');
  });

  it('should not be able to create an anime with negative episodes', async () => {
    await expect(
      createAnimeService.execute({
        title: 'Naruto',
        description: 'Blah blah',
        episodesAmount: -500,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create two or more animes with same title', async () => {
    await createAnimeService.execute({
      title: 'Naruto',
      description: 'Blah blah',
      episodesAmount: 500,
    });

    await expect(
      createAnimeService.execute({
        title: 'Naruto',
        description: 'Blah blah',
        episodesAmount: 500,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
