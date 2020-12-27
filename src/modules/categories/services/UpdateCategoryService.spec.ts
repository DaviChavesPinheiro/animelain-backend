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

  it('should not be able to update an non existent category', async () => {
    await expect(
      updateCategoryService.execute({
        category_id: 'some-non-existent-category-id',
        name: 'Shounen',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an category to a name that already exist in another category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    await fakeCategoriesRepository.create({
      name: 'Shounen',
    });

    await expect(
      updateCategoryService.execute({
        category_id: category.id,
        name: 'Shounen',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const updatedCategory = await updateCategoryService.execute({
      category_id: category.id,
      name: 'Seinen 2',
    });

    expect(updatedCategory.name).toBe('Seinen 2');
  });

  it('should be able to update an category to the same name', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const updatedCategory = await updateCategoryService.execute({
      category_id: category.id,
      name: 'Seinen',
    });

    expect(updatedCategory.name).toBe('Seinen');
  });
});
