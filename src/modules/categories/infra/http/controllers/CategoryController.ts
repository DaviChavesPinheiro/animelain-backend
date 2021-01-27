import ListCategoryService from '@modules/categories/services/ListCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCategoryService = container.resolve(ListCategoryService);

    const category = await listCategoryService.execute({ id });

    return response.json(classToClass(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const category = await updateCategoryService.execute({
      categoryId: id,
      name,
    });

    return response.json(classToClass(category));
  }
}
