import UpdateCharacterBannerService from '@modules/characters/services/UpdateCharacterBannerService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharacterBannerController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { id } = request.params;

    const updateCharacterBannerService = container.resolve(
      UpdateCharacterBannerService,
    );

    const character = await updateCharacterBannerService.execute({
      characterId: id,
      avatarFilename: file.filename,
    });

    return response.json(classToClass(character));
  }
}
