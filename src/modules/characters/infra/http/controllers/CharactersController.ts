import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import ListCharactersService from '@modules/characters/services/ListCharactersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCharactersService = container.resolve(ListCharactersService);

    const characters = await listCharactersService.execute();

    return response.json(characters);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, age, animesIds = [] } = request.body;
    const createCharacterService = container.resolve(CreateCharacterService);

    const character = await createCharacterService.execute({
      name,
      description,
      age,
      animesIds,
    });

    return response.json(character);
  }
}
