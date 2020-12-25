import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';

import UpdateProfileService from './UpdateAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeCharactersRepository: FakeCharactersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateAnimeService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    updateProfileService = new UpdateProfileService(
      fakeAnimesRepository,
      fakeNotificationsRepository,
      fakeCategoriesRepository,
      fakeCharactersRepository,
    );
  });

  it('should be able update the profile from an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
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
    });

    await fakeAnimesRepository.create({
      title: 'One Piece',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
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

  it('should be able update the genres in profile of an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'descriptionnn',
      episodesAmount: 10,
      created_by_id: 'some_id',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const updatedAnime = await updateProfileService.execute({
      anime_id: anime.id,
      title: 'Naruto2',
      description: 'descriptionnn',
      episodesAmount: 10,
      genres: [
        {
          score: 3,
          category_id: category.id,
        },
      ],
    });

    expect(updatedAnime.genres).toHaveLength(1);
    expect(updatedAnime.genres[0]).toHaveProperty('id');
    expect(updatedAnime.genres[0]).toHaveProperty('category_id', category.id);
    expect(updatedAnime.genres[0]).toHaveProperty('score', 3);
  });

  it('should not be able update a non existent genre in profile of an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'descriptionnn',
      episodesAmount: 10,
      created_by_id: 'some_id',
    });

    await expect(
      updateProfileService.execute({
        anime_id: anime.id,
        title: 'Naruto2',
        description: 'descriptionnn',
        episodesAmount: 10,
        genres: [
          {
            score: 3,
            category_id: 'non-existent-catogory-id',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
