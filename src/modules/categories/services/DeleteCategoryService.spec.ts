import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';

import DeleteCategoryService from './DeleteCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let deleteCategoryService: DeleteCategoryService;

describe('DeleteCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();

    deleteCategoryService = new DeleteCategoryService(fakeCategoriesRepository);
  });

  it('should not be able to delete an non existent category', async () => {
    await expect(
      deleteCategoryService.execute({
        category_id: 'some-non-existent-category-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able delete the category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    await deleteCategoryService.execute({
      category_id: category.id,
    });

    expect(await fakeCategoriesRepository.findById(category.id)).toBe(
      undefined,
    );
  });
});
