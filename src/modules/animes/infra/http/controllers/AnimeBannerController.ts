import UpdateAnimeBannerService from '@modules/animes/services/UpdateAnimeBannerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AnimeBannerController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { id } = request.params;

    const updateAnimeBannerService = container.resolve(
      UpdateAnimeBannerService,
    );

    const anime = await updateAnimeBannerService.execute({
      anime_id: id,
      avatarFilename: file.filename,
    });

    return response.json(anime);
  }
}