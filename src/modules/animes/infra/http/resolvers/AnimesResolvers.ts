/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { container } from 'tsyringe';
import Joi from 'joi';
import DeleteAnimeService from '@modules/animes/services/DeleteAnimeService';
import UpdateAnimeService from '@modules/animes/services/UpdateAnimeService';
import { classToClass } from 'class-transformer';
import ListAnimeCharactersService from '@modules/animes/services/ListAnimeCharactersService';
import ListCharacterService from '@modules/characters/services/ListCharacterService';
import ListAnimeGenresService from '@modules/animes/services/ListAnimeGenresService';
import ListCategoryService from '@modules/categories/services/ListCategoryService';
import AddAnimeCharacterService from '@modules/animes/services/AddCharacterAnimeService';
import AddGenreAnimeService from '@modules/animes/services/AddGenreAnimeService';
import RemoveAnimeCharacterService from '@modules/animes/services/RemoveAnimeCharacterService';
import RemoveGenreAnimeService from '@modules/animes/services/RemoveGenreAnimeService';
import CreateAnimeService from '../../../services/CreateAnimeService';
import ListAnimesService from '../../../services/ListAnimesService';
import ListAnimeService from '../../../services/ListAnimeService';
import Anime from '../../typeorm/entities/Anime';
import ListUserService from '../../../../users/services/ListUserService';
import IResolvers from '../../../../../@types/IResolvers';
import AnimeCharacter from '../../typeorm/entities/AnimeCharacter';
import Genre from '../../typeorm/entities/AnimeGenre';

const resolvers: IResolvers = {
  Query: {
    animes: async () => {
      const listAnimesService = container.resolve(ListAnimesService);

      const animes = await listAnimesService.execute({});
      return classToClass(animes);
    },
    anime: async (_, data) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const listAnimeService = container.resolve(ListAnimeService);

      const anime = await listAnimeService.execute({ id });

      return classToClass(anime);
    },
  },
  Anime: {
    createdBy: async (parent: Anime) => {
      const listUserService = container.resolve(ListUserService);

      if (parent.createdById) {
        const user = await listUserService.execute({
          userId: parent.createdById,
        });

        return classToClass(user);
      }
      return null;
    },
    characters: async (parent: Anime) => {
      return parent;
    },
    genres: async (parent: Anime) => {
      return parent;
    },
  },
  CharacterAnimeConnection: {
    edges: async (parent: Anime) => {
      const listAnimeCharactersService = container.resolve(
        ListAnimeCharactersService,
      );

      const anime_characters = await listAnimeCharactersService.execute({
        animeId: parent.id,
      });

      return classToClass(anime_characters);
    },
  },
  GenreAnimeConnection: {
    edges: async (parent: Anime) => {
      const listAnimeGenresService = container.resolve(ListAnimeGenresService);

      const anime_genres = await listAnimeGenresService.execute({
        animeId: parent.id,
      });

      return classToClass(anime_genres);
    },
  },
  CharacterAnimeEdge: {
    node: async (parent: AnimeCharacter) => {
      const listCharacterService = container.resolve(ListCharacterService);

      const character = await listCharacterService.execute({
        id: parent.characterId,
      });

      return classToClass(character);
    },
  },
  GenreAnimeEdge: {
    node: async (parent: Genre) => {
      const listCategoryService = container.resolve(ListCategoryService);

      const category = await listCategoryService.execute({
        id: parent.categoryId,
      });

      return classToClass(category);
    },
  },
  Mutation: {
    createAnime: async (_, { data }, context) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          title: Joi.string().max(255).trim(),
          description: Joi.string().trim(),
          episodesAmount: Joi.number().integer().positive(),
        })
        .validate(data);

      const { title, description, episodesAmount } = data;

      const createAnimeService = container.resolve(CreateAnimeService);

      const anime = await createAnimeService.execute({
        title,
        description,
        episodesAmount,
        createdById: context.user.id,
      });

      return classToClass(anime);
    },
    updateAnime: async (_, { data }): Promise<Anime> => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
          title: Joi.string().trim(),
          description: Joi.string(),
          episodesAmount: Joi.number().integer(),
        })
        .validate(data);

      const { id, title, description, episodesAmount } = data;

      const updateAnimeService = container.resolve(UpdateAnimeService);

      const anime = await updateAnimeService.execute({
        animeId: id,
        title,
        description,
        episodesAmount,
      });

      return classToClass(anime);
    },
    deleteAnime: async (_, data) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const deleteAnimeService = container.resolve(DeleteAnimeService);

      const anime = await deleteAnimeService.execute({
        id,
      });

      return classToClass(anime);
    },
    addCharacterAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          role: Joi.string(),
          characterId: Joi.string().uuid(),
          animeId: Joi.string().uuid(),
        })
        .validate(data);

      const { role, characterId, animeId } = data;

      const addAnimeCharacterService = container.resolve(
        AddAnimeCharacterService,
      );

      const characterAnime = await addAnimeCharacterService.execute({
        role,
        characterId,
        animeId,
      });

      return classToClass(characterAnime);
    },
    removeCharacterAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          characterId: Joi.string().uuid(),
          animeId: Joi.string().uuid(),
        })
        .validate(data);

      const { characterId, animeId } = data;

      const removeAnimeCharacterService = container.resolve(
        RemoveAnimeCharacterService,
      );

      const characterAnime = await removeAnimeCharacterService.execute({
        characterId,
        animeId,
      });

      return classToClass(characterAnime);
    },
    addGenreAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          score: Joi.number().positive().integer(),
          categoryId: Joi.string().uuid(),
          animeId: Joi.string().uuid(),
        })
        .validate(data);

      const { score, categoryId, animeId } = data;

      const addGenreAnimeService = container.resolve(AddGenreAnimeService);

      const genreAnime = await addGenreAnimeService.execute({
        score,
        categoryId,
        animeId,
      });

      return classToClass(genreAnime);
    },
    removeGenreAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          categoryId: Joi.string().uuid(),
          animeId: Joi.string().uuid(),
        })
        .validate(data);

      const { categoryId, animeId } = data;

      const removeGenreAnimeService = container.resolve(
        RemoveGenreAnimeService,
      );

      const genreAnime = await removeGenreAnimeService.execute({
        categoryId,
        animeId,
      });

      return classToClass(genreAnime);
    },
  },
};

export default resolvers;
