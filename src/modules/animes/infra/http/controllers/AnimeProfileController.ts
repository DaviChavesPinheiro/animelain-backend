import UpdateAnimeProfileService from '@modules/animes/services/UpdateAnimeProfileService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimeProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { id } = request.params;

    const updateAnimeProfileService = container.resolve(
      UpdateAnimeProfileService,
    );

    const anime = await updateAnimeProfileService.execute({
      animeId: id,
      avatarFilename: file.filename,
    });

    return response.json(classToClass(anime));
  }
}
