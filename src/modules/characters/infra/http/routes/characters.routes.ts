import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();
const charactersController = new CharactersController();

charactersRouter.use(ensureAuthenticated);

charactersRouter.get('/', charactersController.index);

charactersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      age: Joi.number().integer().required(),
    }),
  }),
  charactersController.create,
);

export default charactersRouter;
