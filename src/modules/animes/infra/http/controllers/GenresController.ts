import AddGenreService from '@modules/animes/services/AddGenreService';
import ListGenresService from '@modules/animes/services/ListGenresService';
import RemoveGenreService from '@modules/animes/services/RemoveGenreService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class GenresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const listGenresService = container.resolve(ListGenresService);

    const animes = await listGenresService.execute({
      anime_id,
    });

    return response.json(animes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { anime_id, category_id } = request.params;
    const { score } = request.body;

    const addGenreService = container.resolve(AddGenreService);

    const anime = await addGenreService.execute({
      anime_id,
      category_id,
      score: Number(score),
    });

    return response.json(anime);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { anime_id, category_id } = request.params;

    const removeGenreService = container.resolve(RemoveGenreService);

    const anime = await removeGenreService.execute({
      anime_id,
      category_id,
    });

    return response.json(anime);
  }
}
