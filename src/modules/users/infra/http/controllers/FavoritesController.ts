import AddFavoriteAnimeService from '@modules/users/services/AddFavoriteAnimeService';
import RemoveFavoriteAnimeService from '@modules/users/services/RemoveFavoriteAnimeService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class FavoritesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const { id: user_id } = request.user;
    const addFavoriteAnimeService = container.resolve(AddFavoriteAnimeService);

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
      RemoveFavoriteAnimeService,
    );

    await removeFavoriteAnimeService.execute({
      anime_id,
      user_id,
    });

    return response.status(204).json();
  }
}
