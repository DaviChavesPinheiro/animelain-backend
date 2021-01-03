import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListCategoryService from './ListCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoryService: ListCategoryService;

describe('ListCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoryService = new ListCategoryService(fakeCategoriesRepository);
  });

  it('should be able to list an category', async () => {
    await expect(
      listCategoryService.execute({
        id: 'some_non_existent_category_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list a category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Seinen',
    });

    const findedCategory = await listCategoryService.execute({
      id: category.id,
    });

    expect(findedCategory).toMatchObject<Category>(category);
  });
});
