import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import RemoveFavoriteAnimeService from './RemoveFavoriteAnimeService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let removeFavoriteAnimeService: RemoveFavoriteAnimeService;

describe('CreateFavoriteAnime', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    removeFavoriteAnimeService = new RemoveFavoriteAnimeService(
      fakeUsersRepository,
      fakeAnimesRepository,
    );
  });

  it('should not be able to remove a new favorite anime using a non existent user', async () => {
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

  it('should not be able to unfavorite an non existent anime', async () => {
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

  it('should not be able to unfavorite a non favorited anime', async () => {
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

  it('should be able to remove a new favorite anime', async () => {
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

    user.favorite_animes = [anime];

    await removeFavoriteAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(user).toHaveProperty('favorite_animes');
    expect(user.favorite_animes).toHaveLength(0);
  });
});
