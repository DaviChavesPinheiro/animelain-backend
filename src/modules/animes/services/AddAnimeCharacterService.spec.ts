import FakeAnimesRepository from '@modules/animes/repositories/fakes/FakeAnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import AppError from '@shared/errors/AppError';
import FakeAnimesCharactersRepository from '../repositories/fakes/FakeAnimesCharactersRepository';
import IAnimesCharactersRepository from '../repositories/IAnimesCharactersRepository';
import AddAnimeCharacterService from './AddAnimeCharacterService';

let fakeCharactersRepository: ICharactersRepository;
let fakeAnimesRepository: IAnimeRepository;
let fakeAnimesCharactersRepository: IAnimesCharactersRepository;
let addAnimeCharacterService: AddAnimeCharacterService;

describe('AddAnimeCharacterService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeAnimesCharactersRepository = new FakeAnimesCharactersRepository();
    addAnimeCharacterService = new AddAnimeCharacterService(
      fakeAnimesRepository,
      fakeCharactersRepository,
      fakeAnimesCharactersRepository,
    );
  });

  it('should not be able to add a new anime character using a non existent character', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_character_id',
    });

    await expect(
      addAnimeCharacterService.execute({
        anime_id: anime.id,
        character_id: 'some-non-existent-character-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a new anime character using a non existent anime', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 18,
    });

    await expect(
      addAnimeCharacterService.execute({
        character_id: character.id,
        anime_id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a duplicated anime character', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 18,
    });

    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_character_id',
    });

    await addAnimeCharacterService.execute({
      character_id: character.id,
      anime_id: anime.id,
    });

    await expect(
      addAnimeCharacterService.execute({
        character_id: character.id,
        anime_id: anime.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new anime character', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'Description',
      episodesAmount: 700,
      created_by_id: 'some_character_id',
    });

    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 18,
    });

    const animeCharacter = await addAnimeCharacterService.execute({
      character_id: character.id,
      anime_id: anime.id,
    });

    expect(animeCharacter).toHaveProperty('id');
  });
});
