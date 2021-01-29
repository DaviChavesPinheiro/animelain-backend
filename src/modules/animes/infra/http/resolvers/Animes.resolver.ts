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
import AddAnimeCharacterService from '@modules/animes/services/AddAnimeCharacterService';
import RemoveAnimeCharacterService from '@modules/animes/services/RemoveAnimeCharacterService';
import AddAnimeGenreService from '@modules/animes/services/AddAnimeGenreService';
import RemoveAnimeGenreService from '@modules/animes/services/RemoveAnimeGenreService';
import IContext from '../../../../../@types/IContext';
import Anime from '../../typeorm/entities/Anime';
import {
  AddAnimeCharacterInput,
  AddAnimeGenreInput,
  CreateAnimeInput,
  RemoveAnimeCharacterInput,
  RemoveAnimeGenreInput,
  UpdateAnimeInput,
} from '../schemas/Animes.schema';
import AnimeCharacter from '../../typeorm/entities/AnimeCharacter';
import AnimeGenre from '../../typeorm/entities/AnimeGenre';

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

  @Mutation(() => AnimeCharacter)
  async addAnimeCharacter(
    @Arg('data') data: AddAnimeCharacterInput,
  ): Promise<AnimeCharacter> {
    const { role, animeId, characterId } = data;

    const addAnimeCharacterService = container.resolve(
      AddAnimeCharacterService,
    );

    const animeCharacter = await addAnimeCharacterService.execute({
      role,
      animeId,
      characterId,
    });

    return classToClass(animeCharacter);
  }

  @Mutation(() => AnimeCharacter)
  async removeAnimeCharacter(
    @Arg('data') data: RemoveAnimeCharacterInput,
  ): Promise<AnimeCharacter> {
    const { animeId, characterId } = data;

    const removeAnimeCharacterService = container.resolve(
      RemoveAnimeCharacterService,
    );

    const animeCharacter = await removeAnimeCharacterService.execute({
      animeId,
      characterId,
    });

    return classToClass(animeCharacter);
  }

  @Mutation(() => AnimeGenre)
  async addAnimeGenre(
    @Arg('data') data: AddAnimeGenreInput,
  ): Promise<AnimeGenre> {
    const { score, animeId, categoryId } = data;

    const addAnimeGenreService = container.resolve(AddAnimeGenreService);

    const animeGenre = await addAnimeGenreService.execute({
      score,
      animeId,
      categoryId,
    });

    return classToClass(animeGenre);
  }

  @Mutation(() => AnimeGenre)
  async removeAnimeGenre(
    @Arg('data') data: RemoveAnimeGenreInput,
  ): Promise<AnimeGenre> {
    const { animeId, categoryId } = data;

    const removeAnimeGenreService = container.resolve(RemoveAnimeGenreService);

    const animeGenre = await removeAnimeGenreService.execute({
      animeId,
      categoryId,
    });

    return classToClass(animeGenre);
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

  @FieldResolver()
  async characters(@Root() anime: Anime): Promise<Anime> {
    return anime;
  }

  @FieldResolver()
  async genres(@Root() anime: Anime): Promise<Anime> {
    return anime;
  }
}

export default AnimesResolver;
