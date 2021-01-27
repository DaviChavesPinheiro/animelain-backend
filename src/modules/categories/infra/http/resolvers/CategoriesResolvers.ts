/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { container } from 'tsyringe';
import Joi from 'joi';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import { classToClass } from 'class-transformer';
import CreateCategoryService from '../../../services/CreateCategoryService';
import ListCategoriesService from '../../../services/ListCategoriesService';
import ListCategoryService from '../../../services/ListCategoryService';
import Category from '../../typeorm/entities/Category';
import IResolvers from '../../../../../@types/IResolvers';

const resolvers: IResolvers = {
  Query: {
    categories: async () => {
      const listCategoriesService = container.resolve(ListCategoriesService);

      const categories = await listCategoriesService.execute({});
      return classToClass(categories);
    },
    category: async (_, data) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const listCategoryService = container.resolve(ListCategoryService);

      const category = await listCategoryService.execute({ id });

      return classToClass(category);
    },
  },
  Mutation: {
    createCategory: async (_, { data }) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          name: Joi.string().max(255).trim(),
        })
        .validate(data);

      const { name } = data;

      const createCategoryService = container.resolve(CreateCategoryService);

      const category = await createCategoryService.execute({
        name,
      });

      return classToClass(category);
    },
    updateCategory: async (_, { data }): Promise<Category> => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().trim(),
        })
        .validate(data);

      const { id, name } = data;

      const updateCategoryService = container.resolve(UpdateCategoryService);

      const category = await updateCategoryService.execute({
        categoryId: id,
        name,
      });

      return classToClass(category);
    },
    deleteCategory: async (_, data) => {
      Joi.object()
        .options({ stripUnknown: true })
        .keys({
          id: Joi.string().uuid(),
        })
        .validate(data);

      const { id } = data;

      const deleteCategoryService = container.resolve(DeleteCategoryService);

      const category = await deleteCategoryService.execute({
        categoryId: id,
      });

      return classToClass(category);
    },
  },
};

export default resolvers;
