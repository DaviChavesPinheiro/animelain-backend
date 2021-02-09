import ListImageService from '@modules/images/services/ListImageService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import CreateImageService from '@modules/images/services/CreateImageService';
import UpdateImageService from '@modules/images/services/UpdateImageService';
import DeleteImageService from '@modules/images/services/DeleteImageService';
import { GraphQLUpload } from 'graphql-tools';
import { FileUpload } from 'graphql-upload';
import GraphQLUploadFileProvider from '@shared/container/providers/UploadFileProvider/implementations/GraphQLFileUploadProvider';
import Image from '../../typeorm/entities/Image';
import { CreateImageInput, UpdateImageInput } from '../schemas/Image.schema';

@Resolver(Image)
class ImagesResolver {
  @Query(() => Image, { nullable: true })
  async image(@Arg('id') id: string): Promise<Image | undefined> {
    const listImageService = container.resolve(ListImageService);

    const image = await listImageService.execute({ id });

    return classToClass(image);
  }

  @Mutation(() => Image)
  async createImage(
    @Arg('input') input: CreateImageInput,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload,
  ): Promise<Image> {
    const { title, type } = input;

    const graphQLUploadFileProvider = new GraphQLUploadFileProvider();

    const {
      fileName,
      mimeType,
      encoding,
      size,
      height,
      width,
    } = await graphQLUploadFileProvider.uploadFile(file);

    const createImageService = container.resolve(CreateImageService);

    const image = await createImageService.execute({
      fileName,
      title,
      type,
      mimeType,
      encoding,
      size,
      height,
      width,
    });

    return classToClass(image);
  }

  @Mutation(() => Image)
  async updateImage(@Arg('input') input: UpdateImageInput): Promise<Image> {
    const { id, title, width, height, mimeType, encoding, size, type } = input;

    const updateImageService = container.resolve(UpdateImageService);

    const image = await updateImageService.execute({
      id,
      title,
      width,
      height,
      mimeType,
      encoding,
      size,
      type,
    });

    return classToClass(image);
  }

  @Mutation(() => Image)
  async deleteImage(@Arg('id') id: string): Promise<Image> {
    const deleteImageService = container.resolve(DeleteImageService);

    const image = await deleteImageService.execute({ id });

    return classToClass(image);
  }
}

export default ImagesResolver;
