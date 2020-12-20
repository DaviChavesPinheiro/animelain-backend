import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('should be able to create an category', async () => {
    const category = await createCategoryService.execute({
      name: 'Seinen',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create two or more categories with same name', async () => {
    await createCategoryService.execute({
      name: 'Seinen',
    });

    await expect(
      createCategoryService.execute({
        name: 'Seinen',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
