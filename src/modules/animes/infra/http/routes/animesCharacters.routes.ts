import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import AnimesCharactersController from '../controllers/AnimesCharactersController';

const animesCharactersRouter = Router();
const animesCharactersController = new AnimesCharactersController();

animesCharactersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  animesCharactersController.index,
);

animesCharactersRouter.post(
  '/:anime_id/add/:character_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      anime_id: Joi.string().uuid().required(),
      character_id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  animesCharactersController.create,
);
animesCharactersRouter.delete(
  '/:anime_id/remove/:character_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      anime_id: Joi.string().uuid().required(),
      character_id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  animesCharactersController.remove,
);

export default animesCharactersRouter;
