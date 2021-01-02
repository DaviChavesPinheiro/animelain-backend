import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import Anime from '../infra/typeorm/entities/Anime';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import ListSeasonAnimesService from './ListSeasonAnimesService';

let fakeAnimesRepository: FakeAnimesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listSeasonAnimesService: ListSeasonAnimesService;

describe('ListSeasonAnimesService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listSeasonAnimesService = new ListSeasonAnimesService(
      fakeAnimesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all season animes', async () => {
    const animes = await listSeasonAnimesService.execute();

    expect(animes).toMatchObject<Anime[]>(animes);
  });
});
