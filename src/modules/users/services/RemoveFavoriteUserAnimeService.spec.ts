import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeRecentUsersAnimesRepository from '../repositories/fakes/FakeFavoriteUsersAnimesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import RemoveFavoriteAnimeService from './RemoveFavoriteUserAnimeService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeFavoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository;
let removeFavoriteAnimeService: RemoveFavoriteAnimeService;

describe('RemoveFavoriteAnimeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeFavoriteUsersAnimesRepository = new FakeRecentUsersAnimesRepository();
    removeFavoriteAnimeService = new RemoveFavoriteAnimeService(
      fakeUsersRepository,
      fakeAnimesRepository,
      fakeFavoriteUsersAnimesRepository,
    );
  });

  it('should not be able to remove a new favorite user anime using a non existent user', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await expect(
      removeFavoriteAnimeService.execute({
        user_id: 'some-non-existent-user-id',
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a new favorite user anime using a non existent anime', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    await expect(
      removeFavoriteAnimeService.execute({
        user_id: user.id,
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a non existent favorite user anime', async () => {
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
      removeFavoriteAnimeService.execute({
        user_id: user.id,
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove a favorite user anime', async () => {
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

    const createdRecentUserAnime = await fakeFavoriteUsersAnimesRepository.create(
      {
        user_id: user.id,
        anime_id: anime.id,
      },
    );

    const removedRecentUserAnime = await removeFavoriteAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(removedRecentUserAnime.id).toBe(createdRecentUserAnime.id);
  });
});
