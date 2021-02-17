import { FindCategoryInput } from '@modules/categories/infra/http/schemas/Category.schema';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ListCategoriesPageInfoService from '@modules/categories/services/ListCategoriesPageInfoService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import { FindCharacterInput } from '@modules/characters/infra/http/schemas/Character.schema';
import Character from '@modules/characters/infra/typeorm/entities/Character';
import ListCharactersPageInfoService from '@modules/characters/services/ListCharactersPageInfoService';
import ListCharactersService from '@modules/characters/services/ListCharactersService';
import { FindImageInput } from '@modules/images/infra/http/schemas/Image.schema';
import Image from '@modules/images/infra/typeorm/entities/Image';
import ListImagesPageInfoService from '@modules/images/services/ListImagesPageInfoService';
import ListImagesService from '@modules/images/services/ListImagesService';
import { FindMediaInput } from '@modules/medias/infra/http/schemas/Media.schema';
import Media from '@modules/medias/infra/typeorm/entities/Media';
import ListMediasPageInfoService from '@modules/medias/services/ListMediasPageInfoService';
import ListMediasService from '@modules/medias/services/ListMediasService';
import { FindUserInput } from '@modules/users/infra/http/schemas/User.schema';
import User from '@modules/users/infra/typeorm/entities/User';
import ListUsersPageInfoService from '@modules/users/services/ListUsersPageInfoService';
import ListUsersService from '@modules/users/services/ListUsersService';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, FieldResolver, Info, Query, Resolver, Root } from 'type-graphql';
import Page, { PageInput } from '../schemas/Page.schema';
import PageInfo from '../schemas/PageInfo.schema';

interface ISelection {
  name: {
    value: string;
  };
  [key: string]: any;
}

interface IRoot {
  input: PageInput;
  info: any;
}

@Resolver(Page)
class PageResolver {
  @Query(() => Page)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async page(@Arg('input') input: PageInput, @Info() info: any): Promise<any> {
    return { input, info };
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

  @FieldResolver(() => PageInfo)
  async pageInfo(@Root() { input: rootInput, info }: IRoot): Promise<PageInfo> {
    const { page, perPage } = rootInput;

    // eslint-disable-next-line prefer-destructuring
    const selections: ISelection[] = info.fieldNodes[0].selectionSet.selections;
    const filteredSelections = selections.filter(
      selection => selection.name.value !== 'pageInfo',
    );

    if (filteredSelections.length > 1) {
      throw new AppError('Maximum one selection');
    }

    switch (filteredSelections[0].name.value) {
      case 'users': {
        const listUsersPageInfoService = container.resolve(
          ListUsersPageInfoService,
        );

        const usersPageInfo = await listUsersPageInfoService.execute({
          page,
          perPage,
        });

        return classToClass(usersPageInfo);
      }
      case 'medias': {
        const listMediasPageInfoService = container.resolve(
          ListMediasPageInfoService,
        );

        const mediasPageInfo = await listMediasPageInfoService.execute({
          page,
          perPage,
        });

        return classToClass(mediasPageInfo);
      }
      case 'characters': {
        const listCharactersPageInfoService = container.resolve(
          ListCharactersPageInfoService,
        );

        const characatersPageInfo = await listCharactersPageInfoService.execute(
          {
            page,
            perPage,
          },
        );

        return classToClass(characatersPageInfo);
      }
      case 'categories': {
        const listCategoriesPageInfoService = container.resolve(
          ListCategoriesPageInfoService,
        );

        const categoriesPageInfo = await listCategoriesPageInfoService.execute({
          page,
          perPage,
        });

        return classToClass(categoriesPageInfo);
      }
      case 'images': {
        const listImagesPageInfoService = container.resolve(
          ListImagesPageInfoService,
        );

        const imagesPageInfo = await listImagesPageInfoService.execute({
          page,
          perPage,
        });

        return classToClass(imagesPageInfo);
      }

      default:
        throw new Error('This field does not hava a PageInfo');
    }
  }
}

export default PageResolver;
