import AddGenreService from '@modules/animes/services/AddAnimeGenreService';
import ListGenresService from '@modules/animes/services/ListAnimeGenresService';
import RemoveGenreService from '@modules/animes/services/RemoveAnimeGenreService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class GenresController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: animeId } = request.params;
    const listGenresService = container.resolve(ListGenresService);

    const genres = await listGenresService.execute({
      animeId,
    });

    return response.json(classToClass(genres));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { animeId, categoryId } = request.params;
    const { score } = request.body;

    const addGenreService = container.resolve(AddGenreService);

    const genre = await addGenreService.execute({
      animeId,
      categoryId,
      score: Number(score),
    });

    return response.json(classToClass(genre));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { animeId, categoryId } = request.params;

    const removeGenreService = container.resolve(RemoveGenreService);

    const genre = await removeGenreService.execute({
      animeId,
      categoryId,
    });

    return response.json(classToClass(genre));
  }
}
