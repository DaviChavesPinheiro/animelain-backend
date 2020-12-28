import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import CategoriesController from '../controllers/CategoriesController';
import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();
const categoryController = new CategoryController();

categoriesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      search: Joi.string().allow('').lowercase().max(20),
    }),
  }),
  categoriesController.index,
);

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  categoriesController.create,
);

categoriesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  categoriesController.delete,
);

categoriesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  categoryController.index,
);

categoriesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  categoryController.update,
);

export default categoriesRouter;
