import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeFavoriteUsersAnimesRepository from '../repositories/fakes/FakeFavoriteUsersAnimesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AddFavoriteAnimeService from './AddFavoriteUserAnimeService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeFavoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository;
let addFavoriteAnimeService: AddFavoriteAnimeService;

describe('AddFavoriteAnimeService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeFavoriteUsersAnimesRepository = new FakeFavoriteUsersAnimesRepository();
    addFavoriteAnimeService = new AddFavoriteAnimeService(
      fakeUsersRepository,
      fakeAnimesRepository,
      fakeFavoriteUsersAnimesRepository,
    );
  });

  it('should not be able to add a new favorite user anime using a non existent user', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await expect(
      addFavoriteAnimeService.execute({
        user_id: 'some-non-existent-user-id',
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a new favorite user anime using a non existent anime', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    await expect(
      addFavoriteAnimeService.execute({
        user_id: user.id,
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a duplicated favorite user anime', async () => {
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

    await addFavoriteAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    await expect(
      addFavoriteAnimeService.execute({
        user_id: user.id,
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new favorite user anime', async () => {
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

    const favoriteUserAnime = await addFavoriteAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(favoriteUserAnime).toHaveProperty('id');
  });
});
