import Anime from '../infra/typeorm/entities/Anime';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import ListAnimeService from './ListAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let listAnimeService: ListAnimeService;

describe('ListAnime', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    listAnimeService = new ListAnimeService(fakeAnimesRepository);
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
