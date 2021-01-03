import AddAnimeCharacterService from '@modules/animes/services/AddAnimeCharacterService';
import ListAnimeCharactersService from '@modules/animes/services/ListAnimeCharactersService';
import RemoveAnimeCharacterService from '@modules/animes/services/RemoveAnimeCharacterService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class AnimesCharactersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: anime_id } = request.params;
    const listAnimeCharactersService = container.resolve(
      ListAnimeCharactersService,
    );

    const animes = await listAnimeCharactersService.execute({
      anime_id,
    });

    return response.json(animes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { anime_id, character_id } = request.params;

    const addAnimeCharacterService = container.resolve(
      AddAnimeCharacterService,
    );

    await addAnimeCharacterService.execute({
      anime_id,
      character_id,
    });

    return response.status(204).json();
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { anime_id, character_id } = request.params;

    const removeAnimeCharacterService = container.resolve(
      RemoveAnimeCharacterService,
    );

    await removeAnimeCharacterService.execute({
      anime_id,
      character_id,
    });

    return response.status(204).json();
  }
}
