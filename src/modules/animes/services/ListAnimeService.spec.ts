import FakeFavoriteUsersAnimesRepository from '@modules/users/repositories/fakes/FakeFavoriteUsersAnimesRepository';
import IFavoriteUsersAnimesRepository from '@modules/users/repositories/IFavoriteUsersAnimesRepository';
import AppError from '@shared/errors/AppError';
import Anime from '../infra/typeorm/entities/Anime';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '../repositories/IAnimesRepository';
import ListAnimeService from './ListAnimeService';

let fakeAnimesRepository: IAnimeRepository;
let fakeFavoriteUsersAnimesRepository: IFavoriteUsersAnimesRepository;
let listAnimeService: ListAnimeService;

describe('ListAnime', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeFavoriteUsersAnimesRepository = new FakeFavoriteUsersAnimesRepository();
    listAnimeService = new ListAnimeService(
      fakeAnimesRepository,
      fakeFavoriteUsersAnimesRepository,
    );
  });

  it('should be able to list an anime', async () => {
    await expect(
      listAnimeService.execute({
        id: 'some_non_existent_anime_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'fghj',
      episodesAmount: 10,
      created_by_id: 'some_id',
    });

    const findedAnime = await listAnimeService.execute({
      id: anime.id,
    });

    expect(findedAnime).toMatchObject<Anime>(anime);
  });
});
