import AppError from '@shared/errors/AppError';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';

import UpdateProfileService from './UpdateAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();

    updateProfileService = new UpdateProfileService(fakeAnimesRepository);
  });

  it('should be able update the profile from an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
      genres: [],
      characters: [],
    });

    const updatedAnime = await updateProfileService.execute({
      anime_id: anime.id,
      title: 'Naruto 2',
      description: 'updated description',
      episodesAmount: 700,
    });

    expect(updatedAnime.title).toBe('Naruto 2');
    expect(updatedAnime.description).toBe('updated description');
    expect(updatedAnime.episodesAmount).toBe(700);
  });

  it('should not be able update the profile from non-existing anime', async () => {
    expect(
      updateProfileService.execute({
        anime_id: 'some-non-existent-id',
        title: 'Naruto 2',
        description: 'updated description',
        episodesAmount: 700,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an anime to negative episodes', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
      genres: [],
      characters: [],
    });

    expect(
      updateProfileService.execute({
        anime_id: anime.id,
        title: 'Naruto 2',
        description: 'updated description',
        episodesAmount: -700,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an anime to the same title', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
      genres: [],
      characters: [],
    });

    const updatedAnime = await updateProfileService.execute({
      anime_id: anime.id,
      title: 'Naruto',
      description: 'updated description',
      episodesAmount: 700,
    });

    expect(updatedAnime.title).toBe('Naruto');
  });
  it('should not be able to update an anime to a title that already exist in another anime', async () => {
    const anime1 = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
      genres: [],
      characters: [],
    });

    await fakeAnimesRepository.create({
      title: 'One Piece',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
      genres: [],
      characters: [],
    });

    await expect(
      updateProfileService.execute({
        anime_id: anime1.id,
        title: 'One Piece',
        description: 'Blah blah',
        episodesAmount: 500,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
