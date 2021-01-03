import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeRecentUsersAnimesRepository from '../repositories/fakes/FakeRecentUsersAnimesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IRecentUsersAnimesRepository from '../repositories/IRecentUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AddRecentUserAnimeService from './AddRecentUserAnimeService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeRecentUsersAnimesRepository: IRecentUsersAnimesRepository;
let addRecentUserAnimeService: AddRecentUserAnimeService;

describe('AddRecentUserAnimeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeRecentUsersAnimesRepository = new FakeRecentUsersAnimesRepository();
    addRecentUserAnimeService = new AddRecentUserAnimeService(
      fakeUsersRepository,
      fakeAnimesRepository,
      fakeRecentUsersAnimesRepository,
    );
  });

  it('should not be able to add a new recent user anime using a non existent user', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await expect(
      addRecentUserAnimeService.execute({
        user_id: 'some-non-existent-user-id',
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a new recent user anime using a non existent anime', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    await expect(
      addRecentUserAnimeService.execute({
        user_id: user.id,
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a duplicated recent user anime', async () => {
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

    await addRecentUserAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    await expect(
      addRecentUserAnimeService.execute({
        user_id: user.id,
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new recent user anime', async () => {
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

    const recentUserAnime = await addRecentUserAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(recentUserAnime).toHaveProperty('id');
  });
});
