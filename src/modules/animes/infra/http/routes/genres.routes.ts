import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import GenresController from '../controllers/GenresController';

const genresRouter = Router();
const genresController = new GenresController();

genresRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  genresController.index,
);

genresRouter.post(
  '/:anime_id/:category_id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      score: Joi.number().positive().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      anime_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  genresController.create,
);
genresRouter.delete(
  '/:anime_id/:category_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      anime_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  genresController.remove,
);

export default genresRouter;
