import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import CreateCharacterService from './CreateCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let createCharacterService: CreateCharacterService;

describe('CreateCharacterService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    createCharacterService = new CreateCharacterService(
      fakeCharactersRepository,
    );
  });

  it('should be able to create a character', async () => {
    const character = await createCharacterService.execute({
      name: 'Luffy',
      description: 'Boing',
      age: 18,
    });

    expect(character).toHaveProperty('id');
  });

  it('should not be able to create a character with negative age', async () => {
    await expect(
      createCharacterService.execute({
        name: 'Naruto',
        description: 'Blah blah',
        age: -10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
