import Category from '../infra/typeorm/entities/Category';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoriesService: ListCategoriesService;

describe('ListCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to list all categories', async () => {
    const categories = await listCategoriesService.execute({});

    expect(categories).toMatchObject<Category[]>(categories);
  });
});
