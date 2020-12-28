import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';

import DeleteCharacterService from './DeleteCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let deleteCharacterService: DeleteCharacterService;

describe('DeleteCharacterService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();

    deleteCharacterService = new DeleteCharacterService(
      fakeCharactersRepository,
    );
  });

  it('should not be able to delete an non existent character', async () => {
    await expect(
      deleteCharacterService.execute({
        id: 'some-non-existent-character-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able delete the character', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 18,
    });

    await deleteCharacterService.execute({
      id: character.id,
    });

    expect(await fakeCharactersRepository.findById(character.id)).toBe(
      undefined,
    );
  });
});
