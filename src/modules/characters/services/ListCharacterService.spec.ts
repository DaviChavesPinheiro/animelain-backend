import AppError from '@shared/errors/AppError';
import Character from '../infra/typeorm/entities/Character';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import ListCharacterService from './ListCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let listCharacterService: ListCharacterService;

describe('ListCharacter', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    listCharacterService = new ListCharacterService(fakeCharactersRepository);
  });

  it('should be able to list an character', async () => {
    await expect(
      listCharacterService.execute({
        id: 'some_non_existent_character_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list a character', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'fghj',
      age: 10,
    });

    const findedCharacter = await listCharacterService.execute({
      id: character.id,
    });

    expect(findedCharacter).toMatchObject<Character>(character);
  });
});
