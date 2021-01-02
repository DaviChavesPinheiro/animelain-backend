import CreateAnimeService from '@modules/animes/services/CreateAnimeService';
import DeleteAnimeService from '@modules/animes/services/DeleteAnimeService';
import ListAnimesService from '@modules/animes/services/ListAnimesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { search, categories } = request.query;

    const listAnimesService = container.resolve(ListAnimesService);

    const animes = await listAnimesService.execute({
      search: search as string,
      categories: categories as string[],
    });

    return response.json(classToClass(animes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, episodesAmount } = request.body;
    const { id } = request.user;
    const createAnimeService = container.resolve(CreateAnimeService);

    const anime = await createAnimeService.execute({
      title,
      description,
      episodesAmount,
      created_by_id: id,
    });

    return response.json(classToClass(anime));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAnimeService = container.resolve(DeleteAnimeService);

    await deleteAnimeService.execute({
      id,
    });

    return response.status(204).json();
  }
}
