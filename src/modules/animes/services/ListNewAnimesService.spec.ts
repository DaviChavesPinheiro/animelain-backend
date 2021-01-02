import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import Anime from '../infra/typeorm/entities/Anime';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import ListNewAnimesService from './ListNewAnimesService';

let fakeAnimesRepository: FakeAnimesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listNewAnimesService: ListNewAnimesService;

describe('ListNewAnimesService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listNewAnimesService = new ListNewAnimesService(
      fakeAnimesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all newers animes', async () => {
    const animes = await listNewAnimesService.execute();

    expect(animes).toMatchObject<Anime[]>(animes);
  });
});
