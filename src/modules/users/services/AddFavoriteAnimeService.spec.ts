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
    addFavoriteAnimeService = new AddFavoriteAnimeService(fakeUsersRepository);
  });

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
    expect(user.favorite_animes).toContainEqual({ id: anime.id });
  });

  // it('should not be able to create a new user with same email from another', async () => {
  //   await addFavoriteAnimeService.execute({
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
