import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import Anime from '../infra/typeorm/entities/Anime';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import ListAnimesService from './ListAnimesService';

let fakeAnimesRepository: FakeAnimesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAnimesService: ListAnimesService;

describe('ListAnimes', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listAnimesService = new ListAnimesService(
      fakeAnimesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all animes', async () => {
    const animes = await listAnimesService.execute({});

    expect(animes).toMatchObject<Anime[]>(animes);
  });
});
