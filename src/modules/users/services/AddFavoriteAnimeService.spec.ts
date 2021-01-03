import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AddFavoriteAnimeService from './AddFavoriteAnimeService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let addFavoriteAnimeService: AddFavoriteAnimeService;

describe('CreateFavoriteAnime', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    addFavoriteAnimeService = new AddFavoriteAnimeService(
      fakeUsersRepository,
      fakeAnimesRepository,
    );
  });

  it('should not be able to add a new favorite anime using a non existent user', async () => {
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

  it('should not be able to favorite an non existent anime', async () => {
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

  // it('should not be able to favorite duplicated animes', async () => {
  //   const user = await fakeUsersRepository.create({
  //     name: 'Lain',
  //     email: 'lain@gmail.com',
  //     password: 'Password123',
  //   });

  //   const anime = await fakeAnimesRepository.create({
  //     title: 'Naruto',
  //     description: 'Description',
  //     episodesAmount: 700,
  //     created_by_id: 'some_user_id',
  //   });

  //   await addFavoriteAnimeService.execute({
  //     user_id: user.id,
  //     anime_id: anime.id,
  //   });

  //   await expect(
  //     addFavoriteAnimeService.execute({
  //       user_id: user.id,
  //       anime_id: anime.id,
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  it('should be able to add a new favorite anime', async () => {
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

    await addFavoriteAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(user).toHaveProperty('favorite_animes');
    expect(user.favorite_animes).toHaveLength(1);
    // expect(user.favorite_animes[0]).toHaveProperty('id', anime.id);
  });
});
