import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ListFavoriteAnimesService from './ListFavoriteAnimesService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let listFavoriteAnimesService: ListFavoriteAnimesService;

describe('ListFavoriteAnimesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    listFavoriteAnimesService = new ListFavoriteAnimesService(
      fakeUsersRepository,
      fakeAnimesRepository,
    );
  });

  it('should not be able to list favorite animes using a non existent user', async () => {
    await expect(
      listFavoriteAnimesService.execute({
        user_id: 'some-non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list favorite animes from a user', async () => {
    const userA = await fakeUsersRepository.create({
      name: 'userA',
      email: 'userA@gmail.com',
      password: 'Password123',
    });

    const userB = await fakeUsersRepository.create({
      name: 'userB',
      email: 'userB@gmail.com',
      password: 'Password123',
    });

    const animeA = await fakeAnimesRepository.create({
      title: 'AnimeA',
      description: 'DescriptionA',
      episodesAmount: 10,
      created_by_id: 'some_user_id',
    });

    animeA.favorite_users = [userA, userB];

    await fakeAnimesRepository.save(animeA);

    const favoritesAnimes = await listFavoriteAnimesService.execute({
      user_id: userA.id,
    });

    expect(favoritesAnimes).toContainEqual(animeA);
  });
});
