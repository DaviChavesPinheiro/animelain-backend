import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const listCategoriesService = container.resolve(ListCategoriesService);

    const categories = await listCategoriesService.execute({
      search: search as string,
    });

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({
      name,
    });

    return response.json(category);
  }
}
