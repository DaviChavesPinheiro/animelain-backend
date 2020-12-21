import CreateAnimeService from '@modules/animes/services/CreateAnimeService';
import ListAnimesService from '@modules/animes/services/ListAnimesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAnimesService = container.resolve(ListAnimesService);

    const animes = await listAnimesService.execute();

    return response.json(animes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, episodesAmount, genres } = request.body;
    const { id } = request.user;
    const createAnimeService = container.resolve(CreateAnimeService);

    const anime = await createAnimeService.execute({
      title,
      description,
      episodesAmount,
      created_by_id: id,
      genres,
    });

    return response.json(anime);
  }
}
