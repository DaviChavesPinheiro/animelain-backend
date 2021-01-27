import AddAnimeCharacterService from '@modules/animes/services/AddCharacterAnimeService';
import ListAnimeCharactersService from '@modules/animes/services/ListAnimeCharactersService';
import RemoveAnimeCharacterService from '@modules/animes/services/RemoveAnimeCharacterService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class AnimesCharactersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: animeId } = request.params;
    const listAnimeCharactersService = container.resolve(
      ListAnimeCharactersService,
    );

    const animes = await listAnimeCharactersService.execute({
      animeId,
    });

    return response.json(classToClass(animes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { animeId, characterId } = request.params;

    const addAnimeCharacterService = container.resolve(
      AddAnimeCharacterService,
    );

    const animeCharacter = await addAnimeCharacterService.execute({
      animeId,
      characterId,
    });

    return response.json(classToClass(animeCharacter));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { animeId, characterId } = request.params;

    const removeAnimeCharacterService = container.resolve(
      RemoveAnimeCharacterService,
    );

    const animeCharacter = await removeAnimeCharacterService.execute({
      animeId,
      characterId,
    });

    return response.json(classToClass(animeCharacter));
  }
}
