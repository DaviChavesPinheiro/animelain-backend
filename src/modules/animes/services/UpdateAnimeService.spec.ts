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

  it('should not be able update a non-existing anime', async () => {
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

  it('should not be able to update an anime with a non existent category', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'some_id',
    });

    expect(
      updateProfileService.execute({
        anime_id: anime.id,
        title: 'Naruto',
        description: 'description',
        episodesAmount: 10,
        genres: [
          {
            score: 1,
            category: {
              id: 'non-existent-category-id',
            },
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an anime with a non existent character', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'some_id',
    });

    expect(
      updateProfileService.execute({
        anime_id: anime.id,
        title: 'Naruto',
        description: 'description',
        episodesAmount: 10,
        characters: [
          {
            id: 'non-existent-character-id',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an anime with a valid genre', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'some_id',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'seinen',
    });

    const updatedAnime1 = await updateProfileService.execute({
      anime_id: anime.id,
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      genres: [
        {
          score: 1,
          category: {
            id: category.id,
          },
        },
      ],
    });

    expect(updatedAnime1.genres).toHaveLength(1);
    expect(updatedAnime1.genres[0]).toHaveProperty('id');
    expect(updatedAnime1.genres[0]).toHaveProperty('score', 1);

    const updatedAnime2 = await updateProfileService.execute({
      anime_id: anime.id,
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      genres: [
        {
          id: updatedAnime1.genres[0].id,
          score: 2,
          category: {
            id: category.id,
          },
        },
      ],
    });

    expect(updatedAnime2.genres).toHaveLength(1);
    expect(updatedAnime2.genres[0]).toHaveProperty(
      'id',
      updatedAnime1.genres[0].id,
    );
    expect(updatedAnime2.genres[0]).toHaveProperty('score', 2);
  });

  // it('should be able to update an anime with a valid character', async () => {
  //   const anime = await fakeAnimesRepository.create({
  //     title: 'Naruto',
  //     description: 'description',
  //     episodesAmount: 10,
  //     created_by_id: 'some_id',
  //   });

  //   const character = await fakeCharactersRepository.create({
  //     name: 'naruto',
  //     description: 'description',
  //     age: 18,
  //   });

  //   const updatedAnime = await updateProfileService.execute({
  //     anime_id: anime.id,
  //     title: 'Naruto',
  //     description: 'description',
  //     episodesAmount: 10,
  //     characters: [
  //       {
  //         id: character.id,
  //       },
  //     ],
  //   });

  //   expect(updatedAnime.characters).toHaveLength(1);
  //   expect(updatedAnime.characters[0]).toHaveProperty('id');
  // });

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
});
