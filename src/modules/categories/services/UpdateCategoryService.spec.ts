import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';

import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategoryService: UpdateCategoryService;

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();

    updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
  });

  it('should be able update the category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Naruto',
    });

    const updatedCharacter = await updateCategoryService.execute({
      category_id: category.id,
      name: 'Naruto 2',
    });

    expect(updatedCharacter.name).toBe('Naruto 2');
  });

  it('should be able to update an category to the same name', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Naruto',
    });

    const updatedCharacter = await updateCategoryService.execute({
      category_id: category.id,
      name: 'Naruto',
    });

    expect(updatedCharacter.name).toBe('Naruto');
  });

  it('should not be able to update an category to a name that already exist in another category', async () => {
    const anime1 = await fakeCategoriesRepository.create({
      name: 'Naruto',
    });

    await fakeCategoriesRepository.create({
      name: 'Luffy',
    });

    await expect(
      updateCategoryService.execute({
        category_id: anime1.id,
        name: 'Luffy',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
