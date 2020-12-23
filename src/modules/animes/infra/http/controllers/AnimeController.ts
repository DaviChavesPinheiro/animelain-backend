import ListAnimeService from '@modules/animes/services/ListAnimeService';
import UpdateProfileService from '@modules/animes/services/UpdateAnimeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listAnimeService = container.resolve(ListAnimeService);

    const anime = await listAnimeService.execute({ id });

    return response.json(anime);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description, episodesAmount } = request.body;
    const { id } = request.params;

    const updateProfileService = container.resolve(UpdateProfileService);

    const anime = await updateProfileService.execute({
      anime_id: id,
      title,
      description,
      episodesAmount,
    });

    return response.json(anime);
  }
}
