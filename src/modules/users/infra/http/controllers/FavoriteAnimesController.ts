import AddFavoriteUserAnimeService from '@modules/users/services/AddFavoriteUserAnimeService';
import ListFavoriteUserAnimesService from '@modules/users/services/ListFavoriteUserAnimesService';
import RemoveFavoriteUserAnimeService from '@modules/users/services/RemoveFavoriteUserAnimeService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class FavoriteAnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const listFavoriteAnimesService = container.resolve(
      ListFavoriteUserAnimesService,
    );

    const favoriteUserAnimes = await listFavoriteAnimesService.execute({
      userId,
    });

    return response.json(classToClass(favoriteUserAnimes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: animeId } = request.params;
    const { id: userId } = request.user;
    const addFavoriteAnimeService = container.resolve(
      AddFavoriteUserAnimeService,
    );

    const favoriteUserAnime = await addFavoriteAnimeService.execute({
      animeId,
      userId,
    });

    return response.json(classToClass(favoriteUserAnime));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id: animeId } = request.params;
    const { id: userId } = request.user;
    const removeFavoriteAnimeService = container.resolve(
      RemoveFavoriteUserAnimeService,
    );

    const favoriteUserAnime = await removeFavoriteAnimeService.execute({
      animeId,
      userId,
    });

    return response.json(classToClass(favoriteUserAnime));
  }
}
