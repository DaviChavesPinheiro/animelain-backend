import AddGenreService from '@modules/animes/services/AddGenreAnimeService';
import ListGenresService from '@modules/animes/services/ListAnimeGenresService';
import RemoveGenreService from '@modules/animes/services/RemoveGenreAnimeService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class GenresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const listGenresService = container.resolve(ListGenresService);

    const genres = await listGenresService.execute({
      anime_id,
    });

    return response.json(classToClass(genres));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { anime_id, category_id } = request.params;
    const { score } = request.body;

    const addGenreService = container.resolve(AddGenreService);

    const genre = await addGenreService.execute({
      anime_id,
      category_id,
      score: Number(score),
    });

    return response.json(classToClass(genre));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { anime_id, category_id } = request.params;

    const removeGenreService = container.resolve(RemoveGenreService);

    const genre = await removeGenreService.execute({
      anime_id,
      category_id,
    });

    return response.json(classToClass(genre));
  }
}
