import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeFavoriteUsersAnimesRepository from '../repositories/fakes/FakeFavoriteUsersAnimesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IFavoriteUsersAnimesRepository from '../repositories/IFavoriteUsersAnimesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ListFavoriteUserAnimesService from './ListFavoriteUserAnimesService';

let fakeUsersRepository: IUsersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeFavoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository;
let listFavoriteUserAnimesService: ListFavoriteUserAnimesService;

describe('ListFavoriteUserAnimesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeFavoriteUsersAnimesRepository = new FakeFavoriteUsersAnimesRepository();
    listFavoriteUserAnimesService = new ListFavoriteUserAnimesService(
      fakeUsersRepository,
      fakeFavoriteUsersAnimesRepository,
    );
  });

  it('should not be able to list favorite user animes using a non existent user', async () => {
    await expect(
      listFavoriteUserAnimesService.execute({
        user_id: 'some-non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list favorite user animes from a user', async () => {
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

    await fakeFavoriteUsersAnimesRepository.create({
      user_id: user.id,
      anime_id: animeA.id,
    });

    await fakeFavoriteUsersAnimesRepository.create({
      user_id: user.id,
      anime_id: animeB.id,
    });

    const favoriteUserAnimes = await listFavoriteUserAnimesService.execute({
      user_id: user.id,
    });

    expect(favoriteUserAnimes).toEqual(
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
