import IMediaRepository from '@modules/medias/repositories/IMediasRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MediaCategory from '../infra/typeorm/entities/MediaCategory';
import IMediasCategoriesRepository from '../repositories/IMediasCategoriesRepository';

interface IRequest {
  mediaId: string;
  categoryId: string;
}

@injectable()
export default class RemoveMediaMediaCategoryService {
  constructor(
    @inject('MediasRepository')
    private mediasRepository: IMediaRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('MediasCategoriesRepository')
    private mediasCategoriesRepository: IMediasCategoriesRepository,
  ) {}

  public async execute({
    categoryId,
    mediaId,
  }: IRequest): Promise<MediaCategory> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    const media = await this.mediasRepository.findById(mediaId);

    if (!media) {
      throw new AppError('Media does not exist');
    }

    const checkIfMediaCategoryAlreadyExist = await this.mediasCategoriesRepository.findByMediaIdAndCategoryId(
      { mediaId, categoryId },
    );

    if (!checkIfMediaCategoryAlreadyExist) {
      throw new AppError('This MediaCategory already does not exists');
    }

    await this.mediasCategoriesRepository.deleteById(
      checkIfMediaCategoryAlreadyExist.id,
    );

    return checkIfMediaCategoryAlreadyExist;
  }
}
