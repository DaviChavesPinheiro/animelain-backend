import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';

import UpdateCharacterService from './UpdateCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let updateCharacterService: UpdateCharacterService;

describe('UpdateCharacterService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();

    updateCharacterService = new UpdateCharacterService(
      fakeCharactersRepository,
    );
  });

  it('should be able update the profile of an character', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'fghj',
      age: 10,
    });

    const updatedCharacter = await updateCharacterService.execute({
      character_id: character.id,
      name: 'Naruto 2',
      description: 'updated description',
      age: 18,
    });

    expect(updatedCharacter.name).toBe('Naruto 2');
    expect(updatedCharacter.description).toBe('updated description');
    expect(updatedCharacter.age).toBe(18);
  });

  it('should not be able update the profile of non-existing character', async () => {
    expect(
      updateCharacterService.execute({
        character_id: 'some-non-existent-id',
        name: 'Naruto 2',
        description: 'updated description',
        age: 18,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an character to an negative age', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'fghj',
      age: 10,
    });

    expect(
      updateCharacterService.execute({
        character_id: character.id,
        name: 'Naruto 2',
        description: 'updated description',
        age: -18,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an character to the same name', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'fghj',
      age: 10,
    });

    const updatedCharacter = await updateCharacterService.execute({
      character_id: character.id,
      name: 'Naruto',
      description: 'updated description',
      age: 18,
    });

    expect(updatedCharacter.name).toBe('Naruto');
  });
  it('should not be able to update an character to a name that already exist in another character', async () => {
    const anime1 = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'fghj',
      age: 10,
    });

    await fakeCharactersRepository.create({
      name: 'Luffy',
      description: 'fghj',
      age: 10,
    });

    await expect(
      updateCharacterService.execute({
        character_id: anime1.id,
        name: 'Luffy',
        description: 'Blah blah',
        age: 16,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
