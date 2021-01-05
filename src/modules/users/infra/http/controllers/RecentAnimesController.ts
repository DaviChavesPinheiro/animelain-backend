import AddRecentUserAnimeService from '@modules/users/services/AddRecentUserAnimeService';
import ListRecentUserAnimesService from '@modules/users/services/ListRecentUserAnimesService';
import RemoveRecentUserAnimeService from '@modules/users/services/RemoveRecentUserAnimeService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class RecentAnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listRecentUserAnimesService = container.resolve(
      ListRecentUserAnimesService,
    );

    const animes = await listRecentUserAnimesService.execute({
      user_id,
    });

    return response.json(classToClass(animes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const { id: user_id } = request.user;
    const addRecentUserAnimeService = container.resolve(
      AddRecentUserAnimeService,
    );

    const anime = await addRecentUserAnimeService.execute({
      anime_id,
      user_id,
    });

    return response.json(classToClass(anime));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const { id: user_id } = request.user;
    const removeRecentUserAnimeService = container.resolve(
      RemoveRecentUserAnimeService,
    );

    const anime = await removeRecentUserAnimeService.execute({
      anime_id,
      user_id,
    });

    return response.json(classToClass(anime));
  }
}
