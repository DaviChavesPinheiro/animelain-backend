import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeRecentUsersAnimesRepository from '../repositories/fakes/FakeRecentUsersAnimesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ListRecentUserAnimesService from './ListRecentUserAnimesService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeRecentUsersAnimesRepository: IRecentUsersAnimesRepository;
let listRecentUserAnimesService: ListRecentUserAnimesService;

describe('ListRecentUserAnimesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeRecentUsersAnimesRepository = new FakeRecentUsersAnimesRepository();
    listRecentUserAnimesService = new ListRecentUserAnimesService(
      fakeUsersRepository,
      fakeAnimesRepository,
      fakeRecentUsersAnimesRepository,
    );
  });

  it('should not be able to list recent user animes using a non existent user', async () => {
    await expect(
      listRecentUserAnimesService.execute({
        user_id: 'some-non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list recent user animes from a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@gmail.com',
      password: 'Password123',
    });

    const animeA = await fakeAnimesRepository.create({
      title: 'AnimeA',
      description: 'DescriptionA',
      episodesAmount: 10,
      created_by_id: 'some_user_id',
    });

    const animeB = await fakeAnimesRepository.create({
      title: 'AnimeB',
      description: 'DescriptionB',
      episodesAmount: 10,
      created_by_id: 'some_user_id',
    });

    await fakeRecentUsersAnimesRepository.create({
      user_id: user.id,
      anime_id: animeA.id,
    });

    await fakeRecentUsersAnimesRepository.create({
      user_id: user.id,
      anime_id: animeB.id,
    });

    const recentUserAnimes = await listRecentUserAnimesService.execute({
      user_id: user.id,
    });

    expect(recentUserAnimes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          anime_id: animeA.id,
        }),
        expect.objectContaining({
          anime_id: animeB.id,
        }),
      ]),
    );
  });
});
