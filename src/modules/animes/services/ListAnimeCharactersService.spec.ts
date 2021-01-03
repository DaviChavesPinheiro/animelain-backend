import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import AppError from '@shared/errors/AppError';
import FakeAnimesCharactersRepository from '../repositories/fakes/FakeAnimesCharactersRepository';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import IAnimesCharactersRepository from '../repositories/IAnimesCharactersRepository';
import ListAnimeCharactersService from './ListAnimeCharactersService';

let fakeAnimesRepository: IAnimeRepository;
let fakeAnimesCharactersRepository: IAnimesCharactersRepository;
let listAnimeCharactersService: ListAnimeCharactersService;

describe('ListAnimeCharactersService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeAnimesCharactersRepository = new FakeAnimesCharactersRepository();
    listAnimeCharactersService = new ListAnimeCharactersService(
      fakeAnimesRepository,
      fakeAnimesCharactersRepository,
    );
  });

  it('should not be able to list anime characters using a non existent anime', async () => {
    await expect(
      listAnimeCharactersService.execute({
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list anime characters from a anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Some Description',
      episodesAmount: 700,
      created_by_id: 'some_user_id',
    });

    await fakeAnimesCharactersRepository.create({
      anime_id: anime.id,
      character_id: 'sasuke_character_id',
    });
    await fakeAnimesCharactersRepository.create({
      anime_id: anime.id,
      character_id: 'madara_character_id',
    });

    const animeCharacters = await listAnimeCharactersService.execute({
      anime_id: anime.id,
    });

    expect(animeCharacters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          anime_id: anime.id,
          character_id: 'madara_character_id',
        }),
        expect.objectContaining({
          anime_id: anime.id,
          character_id: 'sasuke_character_id',
        }),
      ]),
    );
  });
});
