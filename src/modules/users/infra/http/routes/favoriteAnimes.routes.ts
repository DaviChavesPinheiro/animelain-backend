import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import FavoriteAnimesController from '../controllers/FavoriteAnimesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const favoriteAnimesRouter = Router();
const favoriteAnimesController = new FavoriteAnimesController();

favoriteAnimesRouter.get(
  '/',
  ensureAuthenticated,
  favoriteAnimesController.index,
);

favoriteAnimesRouter.post(
  '/add/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  favoriteAnimesController.create,
);
favoriteAnimesRouter.delete(
  '/remove/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  favoriteAnimesController.remove,
);

export default favoriteAnimesRouter;
