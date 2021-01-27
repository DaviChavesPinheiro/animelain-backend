/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { container } from 'tsyringe';
import Joi from 'joi';
import DeleteCharacterService from '@modules/characters/services/DeleteCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';
import { classToClass } from 'class-transformer';
import CreateCharacterService from '../../../services/CreateCharacterService';
import ListCharactersService from '../../../services/ListCharactersService';
import ListCharacterService from '../../../services/ListCharacterService';
import Character from '../../typeorm/entities/Character';
import IResolvers from '../../../../../@types/IResolvers';

const resolvers: IResolvers = {
  Query: {
    characters: async () => {
      const listCharactersService = container.resolve(ListCharactersService);

      const characters = await listCharactersService.execute({});
      return classToClass(characters);
    },
    character: async (_, data) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const listCharacterService = container.resolve(ListCharacterService);

      const character = await listCharacterService.execute({ id });

      return classToClass(character);
    },
  },
  Mutation: {
    createCharacter: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          name: Joi.string().max(255).trim(),
          description: Joi.string().trim(),
          age: Joi.number().integer().positive(),
        })
        .validate(data);

      const { name, description, age } = data;

      const createCharacterService = container.resolve(CreateCharacterService);

      const character = await createCharacterService.execute({
        name,
        description,
        age,
      });

      return classToClass(character);
    },
    updateCharacter: async (_, { data }): Promise<Character> => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().trim(),
          description: Joi.string(),
          age: Joi.number().integer(),
        })
        .validate(data);

      const { id, name, description, age } = data;

      const updateCharacterService = container.resolve(UpdateCharacterService);

      const character = await updateCharacterService.execute({
        characterId: id,
        name,
        description,
        age,
      });

      return classToClass(character);
    },
    deleteCharacter: async (_, data) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const deleteCharacterService = container.resolve(DeleteCharacterService);

      const character = await deleteCharacterService.execute({
        id,
      });

      return classToClass(character);
    },
  },
};

export default resolvers;
