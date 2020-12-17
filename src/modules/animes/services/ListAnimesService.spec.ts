import Anime from '../infra/typeorm/entities/Anime';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import ListAnimesService from './ListAnimesService';

let fakeAnimesRepository: FakeAnimesRepository;
let listAnimesService: ListAnimesService;

describe('ListAnimes', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    listAnimesService = new ListAnimesService(fakeAnimesRepository);
  });

  it('should be able to list all animes', async () => {
    const animes = await listAnimesService.execute();

    expect(animes).toMatchObject<Anime[]>(animes);
  });
});
