import { getRepository, Repository } from 'typeorm';
import ICreateImageDTO from '@modules/images/dtos/ICreateImageDTO';
import IImagesRepository from '@modules/images/repositories/IImagesRepository';
import IFindImageDTO from '@modules/images/dtos/IFindImageDTO';
import Image from '../entities/Image';

export default class ImagesRepository implements IImagesRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  public async find({
    search,
    page,
    perPage,
  }: IFindImageDTO): Promise<Image[]> {
    let query = this.ormRepository.createQueryBuilder('image');

    if (search) {
      query = query.andWhere('image.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    return query
      .skip((page - 1) * perPage)
      .take(perPage)
      .getMany();
  }

  public async findByFileName(fileName: string): Promise<Image | undefined> {
    const image = await this.ormRepository.findOne({
      where: { fileName },
    });

    return image;
  }

  public async create({
    fileName,
    title,
    width,
    height,
    mimeType,
    encoding,
    size,
    type,
  }: ICreateImageDTO): Promise<Image> {
    const image = this.ormRepository.create({
      fileName,
      title,
      width,
      height,
      mimeType,
      encoding,
      size,
      type,
    });

    await this.ormRepository.save(image);

    return image;
  }

  public async findById(id: string): Promise<Image | undefined> {
    const image = await this.ormRepository.findOne({
      where: { id },
    });
    return image;
  }

  public async save(data: Image): Promise<Image> {
    return this.ormRepository.save(data);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
