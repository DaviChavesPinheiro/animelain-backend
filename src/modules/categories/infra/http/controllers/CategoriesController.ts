import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const listCategoriesService = container.resolve(ListCategoriesService);

    const categories = await listCategoriesService.execute({
      search: search as string,
    });

    return response.json(classToClass(categories));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({
      name,
    });

    return response.json(classToClass(category));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCategoryService = container.resolve(DeleteCategoryService);

    await deleteCategoryService.execute({
      category_id: id,
    });

    return response.status(204).json();
  }
}
