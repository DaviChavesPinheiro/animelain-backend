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
