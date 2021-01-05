import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import RecentAnimesController from '../controllers/RecentAnimesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const recentAnimesRouter = Router();
const recentAnimesController = new RecentAnimesController();

recentAnimesRouter.get('/', ensureAuthenticated, recentAnimesController.index);

recentAnimesRouter.post(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  recentAnimesController.create,
);
recentAnimesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  recentAnimesController.remove,
);

export default recentAnimesRouter;
