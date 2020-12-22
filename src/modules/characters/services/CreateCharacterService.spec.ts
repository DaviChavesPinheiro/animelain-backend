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
      animesIds: [],
    });

    expect(character).toHaveProperty('id');
  });

  it('should not be able to create a character with negative age', async () => {
    await expect(
      createCharacterService.execute({
        name: 'Naruto',
        description: 'Blah blah',
        age: -10,
        animesIds: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create an anime with a non existing category', async () => {
  //   await expect(
  //     createCharacterService.execute({
  //       title: 'Naruto',
  //       description: 'Blah blah',
  //       episodesAmount: 500,
  //       created_by_id: 'some-uuid-id',
  //       genres: [
  //         {
  //           score: 10,
  //           category_id: 'some-uuid-id',
  //         },
  //       ],
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  // it('should be able to create an anime with a existing category', async () => {
  //   const category = await fakeCategoriesRepository.create({
  //     name: 'some-category',
  //   });

  //   await expect(
  //     createCharacterService.execute({
  //       title: 'Naruto',
  //       description: 'Blah blah',
  //       episodesAmount: 500,
  //       created_by_id: 'some-uuid-id',
  //       genres: [
  //         {
  //           score: 10,
  //           category_id: category.id,
  //         },
  //       ],
  //     }),
  //   ).resolves;
  // });
});
