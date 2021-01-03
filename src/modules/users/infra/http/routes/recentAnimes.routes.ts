import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import RecentAnimesController from '../controllers/RecentAnimesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const favoriteRouter = Router();
const recentAnimesController = new RecentAnimesController();

favoriteRouter.get('/', ensureAuthenticated, recentAnimesController.index);

favoriteRouter.post(
  '/add/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  recentAnimesController.create,
);
favoriteRouter.delete(
  '/remove/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  recentAnimesController.remove,
);

export default favoriteRouter;
