import Character from '../infra/typeorm/entities/Character';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import ListCharactersService from './ListCharactersService';

let fakeCharactersRepository: FakeCharactersRepository;
let listCharactersService: ListCharactersService;

describe('ListCharacterService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    listCharactersService = new ListCharactersService(fakeCharactersRepository);
  });

  it('should be able to list all characters', async () => {
    const character = await listCharactersService.execute();

    expect(character).toMatchObject<Character[]>(character);
  });
});
