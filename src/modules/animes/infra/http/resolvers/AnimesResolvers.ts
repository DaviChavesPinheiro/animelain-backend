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
import AddAnimeCharacterService from '@modules/animes/services/AddAnimeCharacterService';
import RemoveAnimeCharacterService from '@modules/animes/services/RemoveAnimeCharacterService';
import CreateAnimeService from '../../../services/CreateAnimeService';
import ListAnimesService from '../../../services/ListAnimesService';
import ListAnimeService from '../../../services/ListAnimeService';
import Anime from '../../typeorm/entities/Anime';
import ListUserService from '../../../../users/services/ListUserService';
import IResolvers from '../../../../../@types/IResolvers';
import AnimeCharacter from '../../typeorm/entities/AnimeCharacter';
import Genre from '../../typeorm/entities/Genre';

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

      if (parent.created_by_id) {
        const user = await listUserService.execute({
          user_id: parent.created_by_id,
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
        anime_id: parent.id,
      });

      return classToClass(anime_characters);
    },
  },
  GenreAnimeConnection: {
    edges: async (parent: Anime) => {
      const listAnimeGenresService = container.resolve(ListAnimeGenresService);

      const anime_genres = await listAnimeGenresService.execute({
        anime_id: parent.id,
      });

      return classToClass(anime_genres);
    },
  },
  CharacterAnimeEdge: {
    node: async (parent: AnimeCharacter) => {
      const listCharacterService = container.resolve(ListCharacterService);

      const character = await listCharacterService.execute({
        id: parent.character_id,
      });

      return classToClass(character);
    },
  },
  GenreAnimeEdge: {
    node: async (parent: Genre) => {
      const listCategoryService = container.resolve(ListCategoryService);

      const category = await listCategoryService.execute({
        id: parent.category_id,
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
        created_by_id: context.user.id,
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
        anime_id: id,
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
          role: Joi.string().max(255).trim(),
          character_id: Joi.string().uuid(),
          anime_id: Joi.string().uuid(),
        })
        .validate(data);

      const { role, character_id, anime_id } = data;

      const addAnimeCharacterService = container.resolve(
        AddAnimeCharacterService,
      );

      const characterAnime = await addAnimeCharacterService.execute({
        role,
        character_id,
        anime_id,
      });

      return classToClass(characterAnime);
    },
    removeCharacterAnime: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          character_id: Joi.string().uuid(),
          anime_id: Joi.string().uuid(),
        })
        .validate(data);

      const { character_id, anime_id } = data;

      const removeAnimeCharacterService = container.resolve(
        RemoveAnimeCharacterService,
      );

      const characterAnime = await removeAnimeCharacterService.execute({
        character_id,
        anime_id,
      });

      return classToClass(characterAnime);
    },
  },
};

export default resolvers;
