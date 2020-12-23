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
    );
  });

  it('should be able to remove a new favorite anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
      genres: [],
    });

    const user = await fakeUsersRepository.create({
      name: 'Lain',
      email: 'lain@gmail.com',
      password: 'Password123',
    });

    await removeFavoriteAnimeService.execute({
      user_id: user.id,
      anime_id: anime.id,
    });

    expect(user).toHaveProperty('favorite_animes');
    expect(user.favorite_animes).not.toContainEqual({ id: anime.id });
  });

  // it('should not be able to create a new user with same email from another', async () => {
  //   await removeFavoriteAnimeService.execute({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '123456',
  //   });

  //   await expect(
  //     createFavoriteAnimeService.execute({
  //       name: 'John Doe',
  //       email: 'johndoe@example.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
