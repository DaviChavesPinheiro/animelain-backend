import ListAnimesService from '@modules/animes/services/ListAnimesService';
import ListAnimeService from '@modules/animes/services/ListAnimeService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import CreateAnimeService from '@modules/animes/services/CreateAnimeService';
import UpdateAnimeService from '@modules/animes/services/UpdateAnimeService';
import DeleteAnimeService from '@modules/animes/services/DeleteAnimeService';
import ListUserService from '@modules/users/services/ListUserService';
import User from '@modules/users/infra/typeorm/entities/User';
import IContext from '../../../../../@types/IContext';
import Anime from '../../typeorm/entities/Anime';
import { CreateAnimeInput, UpdateAnimeInput } from '../schemas/Animes.schema';

@Resolver(Anime)
class AnimesResolver {
  @Query(() => [Anime])
  async animes(): Promise<Anime[]> {
    const listAnimesService = container.resolve(ListAnimesService);

    const animes = await listAnimesService.execute({});
    return classToClass(animes);
  }

  @Query(() => Anime, { nullable: true })
  async anime(@Arg('id') id: string): Promise<Anime | undefined> {
    const listAnimeService = container.resolve(ListAnimeService);

    const anime = await listAnimeService.execute({ id });
    return classToClass(anime);
  }

  @Mutation(() => Anime)
  async createAnime(
    @Arg('data') data: CreateAnimeInput,
    @Ctx() context: IContext,
  ): Promise<Anime> {
    const { title, description, episodesAmount } = data;

    const createAnimeService = container.resolve(CreateAnimeService);

    const anime = await createAnimeService.execute({
      title,
      description,
      episodesAmount,
      createdById: context.user.id,
    });

    return classToClass(anime);
  }

  @Mutation(() => Anime)
  async updateAnime(@Arg('data') data: UpdateAnimeInput): Promise<Anime> {
    const { id, title, description, episodesAmount } = data;

    const updateAnimeService = container.resolve(UpdateAnimeService);

    const anime = await updateAnimeService.execute({
      animeId: id,
      title,
      description,
      episodesAmount,
    });

    return classToClass(anime);
  }

  @Mutation(() => Anime)
  async deleteAnime(@Arg('id') id: string): Promise<Anime> {
    const deleteAnimeService = container.resolve(DeleteAnimeService);

    const anime = await deleteAnimeService.execute({ id });

    return classToClass(anime);
  }

  @FieldResolver({ nullable: true })
  async createdBy(@Root() anime: Anime): Promise<User | null> {
    const listUserService = container.resolve(ListUserService);

    if (anime.createdById) {
      const user = await listUserService.execute({
        userId: anime.createdById,
      });

      return classToClass(user);
    }
    return null;
  }
}

export default AnimesResolver;
