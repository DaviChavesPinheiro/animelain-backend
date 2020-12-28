import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import DeleteCharacterService from '@modules/characters/services/DeleteCharacterService';
import ListCharactersService from '@modules/characters/services/ListCharactersService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const listCharactersService = container.resolve(ListCharactersService);

    const characters = await listCharactersService.execute({
      search: search as string,
    });

    return response.json(classToClass(characters));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, age } = request.body;
    const createCharacterService = container.resolve(CreateCharacterService);

    const character = await createCharacterService.execute({
      name,
      description,
      age,
    });

    return response.json(classToClass(character));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCharacterService = container.resolve(DeleteCharacterService);

    await deleteCharacterService.execute({
      id,
    });

    return response.status(204).json();
  }
}
