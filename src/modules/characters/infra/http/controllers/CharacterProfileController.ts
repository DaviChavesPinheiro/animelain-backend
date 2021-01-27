import UpdateCharacterProfileService from '@modules/characters/services/UpdateCharacterProfileService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CharacterProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { id } = request.params;

    const updateCharacterProfileService = container.resolve(
      UpdateCharacterProfileService,
    );

    const character = await updateCharacterProfileService.execute({
      characterId: id,
      avatarFilename: file.filename,
    });

    return response.json(classToClass(character));
  }
}
