import { FindCategoryInput } from '@modules/categories/infra/http/schemas/Category.schema';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import { FindCharacterInput } from '@modules/characters/infra/http/schemas/Character.schema';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import ListCharactersService from '@modules/characters/services/ListCharactersService';
import { FindImageInput } from '@modules/images/infra/http/schemas/Image.schema';
import Image from '@modules/images/infra/typeorm/entities/Image';
import ListImagesService from '@modules/images/services/ListImagesService';
import { FindMediaInput } from '@modules/medias/infra/http/schemas/Media.schema';
import Media from '@modules/medias/infra/typeorm/entities/Media';
import ListMediasService from '@modules/medias/services/ListMediasService';
import { FindUserInput } from '@modules/users/infra/http/schemas/User.schema';
import User from '@modules/users/infra/typeorm/entities/User';
import ListUsersService from '@modules/users/services/ListUsersService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import Page, { PageInput } from '../schemas/Page.schema';

interface IRoot {
  input: PageInput;
}

@Resolver(Page)
class PageResolver {
  @Query(() => Page)
  async page(@Arg('input') input: PageInput): Promise<any> {
    return { input };
  }

  @FieldResolver(() => [Media])
  async medias(
    @Root() { input: rootInput }: IRoot,
    @Arg('input') input: FindMediaInput,
  ): Promise<Media[]> {
    const {
      type,
      search,
      title,
      season,
      categoryIn,
      characterIn,
      episodesAmount,
    } = input;

    const { page, perPage } = rootInput;

    const listMediasService = container.resolve(ListMediasService);

    const medias = await listMediasService.execute({
      type,
      search,
      title,
      season,
      categoryIn,
      characterIn,
      episodesAmount,
      page,
      perPage,
    });
    return classToClass(medias);
  }

  @FieldResolver(() => [User])
  async users(
    @Root() { input: rootInput }: IRoot,
    @Arg('input') input: FindUserInput,
  ): Promise<User[]> {
    const { search } = input;

    const { page, perPage } = rootInput;

    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute({
      search,
      page,
      perPage,
    });

    return classToClass(users);
  }

  @FieldResolver(() => [Character])
  async characters(
    @Root() { input: rootInput }: IRoot,
    @Arg('input') input: FindCharacterInput,
  ): Promise<Character[]> {
    const { search } = input;

    const { page, perPage } = rootInput;

    const listCharactersService = container.resolve(ListCharactersService);

    const characters = await listCharactersService.execute({
      search,
      page,
      perPage,
    });

    return classToClass(characters);
  }

  @FieldResolver(() => [Category])
  async categories(
    @Root() { input: rootInput }: IRoot,
    @Arg('input') input: FindCategoryInput,
  ): Promise<Category[]> {
    const { search } = input;

    const { page, perPage } = rootInput;

    const listCategoriesService = container.resolve(ListCategoriesService);

    const categories = await listCategoriesService.execute({
      search,
      page,
      perPage,
    });
    return classToClass(categories);
  }

  @FieldResolver(() => [Image])
  async images(
    @Root() { input: rootInput }: IRoot,
    @Arg('input') input: FindImageInput,
  ): Promise<Image[]> {
    const { search } = input;

    const { page, perPage } = rootInput;

    const listImagesService = container.resolve(ListImagesService);

    const images = await listImagesService.execute({
      search,
      page,
      perPage,
    });

    return classToClass(images);
  }
}

export default PageResolver;
