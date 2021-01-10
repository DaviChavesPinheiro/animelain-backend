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

// animesCharactersRouter.put(
//   '/:id',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       role: Joi.string().lowercase().valid('primary', 'secondary', 'tertiary'),
//     }),
//     [Segments.PARAMS]: Joi.object().keys({
//       id: Joi.string().uuid().required(),
//     }),
//   }),
//   ensureAuthenticated,
//   animesCharactersCondasdasdastroller.index,
// );

animesCharactersRouter.post(
  '/:anime_id/:character_id',
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
  '/:anime_id/:character_id',
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
