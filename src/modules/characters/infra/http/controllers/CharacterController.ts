import ListCharacterService from '@modules/characters/services/ListCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharacterController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCharacterService = container.resolve(ListCharacterService);

    const character = await listCharacterService.execute({ id });

    return response.json(classToClass(character));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, age } = request.body;
    const { id: character_id } = request.params;

    const updateCharacterService = container.resolve(UpdateCharacterService);

    const character = await updateCharacterService.execute({
      character_id,
      name,
      description,
      age,
    });

    return response.json(classToClass(character));
  }
}
