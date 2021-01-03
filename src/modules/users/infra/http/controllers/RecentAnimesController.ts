import AddRecentUserAnimeService from '@modules/users/services/AddRecentUserAnimeService';
import ListRecentUserAnimesService from '@modules/users/services/ListRecentUserAnimesService';
import RemoveRecentUserAnimeService from '@modules/users/services/RemoveRecentUserAnimeService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class RecentAnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listFavoriteAnimesService = container.resolve(
      ListRecentUserAnimesService,
    );

    const animes = await listFavoriteAnimesService.execute({
      user_id,
    });

    return response.json(animes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const { id: user_id } = request.user;
    const addFavoriteAnimeService = container.resolve(
      AddRecentUserAnimeService,
    );

    await addFavoriteAnimeService.execute({
      anime_id,
      user_id,
    });

    return response.status(204).json();
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const { id: user_id } = request.user;
    const removeFavoriteAnimeService = container.resolve(
      RemoveRecentUserAnimeService,
    );

    await removeFavoriteAnimeService.execute({
      anime_id,
      user_id,
    });

    return response.status(204).json();
  }
}
