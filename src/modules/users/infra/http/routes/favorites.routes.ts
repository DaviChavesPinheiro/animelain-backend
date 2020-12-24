import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import FavoritesController from '../controllers/FavoritesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const favoriteRouter = Router();
const profileController = new FavoritesController();

favoriteRouter.use(ensureAuthenticated);

favoriteRouter.post(
  '/animes/add/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  profileController.create,
);
favoriteRouter.delete(
  '/animes/remove/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  profileController.remove,
);

export default favoriteRouter;
