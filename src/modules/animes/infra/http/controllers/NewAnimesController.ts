import ListNewAnimesService from '@modules/animes/services/ListNewAnimesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class NewAnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listNewAnimesService = container.resolve(ListNewAnimesService);

    const animes = await listNewAnimesService.execute();

    return response.json(classToClass(animes));
  }
}
