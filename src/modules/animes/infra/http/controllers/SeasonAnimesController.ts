import ListSeasonAnimesService from '@modules/animes/services/ListSeasonAnimesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SeasonAnimesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSeasonAnimesService = container.resolve(ListSeasonAnimesService);

    const animes = await listSeasonAnimesService.execute();

    return response.json(classToClass(animes));
  }
}
