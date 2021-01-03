import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeRecentUsersAnimesRepository from '../repositories/fakes/FakeRecentUsersAnimesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import RemoveRecentUserAnimeService from './RemoveRecentUserAnimeService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeRecentUsersAnimesRepository: IRecentUsersAnimesRepository;
let removeRecentUserAnimeService: RemoveRecentUserAnimeService;

describe('RemoveRecentUserAnimeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeRecentUsersAnimesRepository = new FakeRecentUsersAnimesRepository();
    removeRecentUserAnimeService = new RemoveRecentUserAnimeService(
      fakeUsersRepository,
      fakeAnimesRepository,
      fakeRecentUsersAnimesRepository,
    );
  });

  it('should not be able to remove a new recent user anime using a non existent user', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await expect(
      removeRecentUserAnimeService.execute({
        user_id: 'some-non-existent-user-id',
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a new recent user anime using a non existent anime', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    await expect(
      removeRecentUserAnimeService.execute({
        user_id: user.id,
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a non existent recent user anime', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await expect(
      removeRecentUserAnimeService.execute({
        user_id: user.id,
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove a recent user anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    const createdRecentUserAnime = await fakeRecentUsersAnimesRepository.create(
      {
        user_id: user.id,
        anime_id: anime.id,
      },
    );

    const removedRecentUserAnime = await removeRecentUserAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(removedRecentUserAnime.id).toBe(createdRecentUserAnime.id);
  });
});
