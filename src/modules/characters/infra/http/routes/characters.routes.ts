import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import ensureAdmin from '@modules/users/infra/http/middlewares/ensureAdmin';
import CharactersController from '../controllers/CharactersController';
import CharacterController from '../controllers/CharacterController';
import CharacterProfileController from '../controllers/CharacterProfileController';
import CharacterBannerController from '../controllers/CharacterBannerController';

const charactersRouter = Router();
const upload = multer(uploadConfig.multer);
const charactersController = new CharactersController();
const characterController = new CharacterController();
const characterProfileController = new CharacterProfileController();
const characterBannerController = new CharacterBannerController();

charactersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      search: Joi.string().allow('').lowercase().max(20),
    }),
  }),
  charactersController.index,
);

charactersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      age: Joi.number().integer().required(),
    }),
  }),
  ensureAuthenticated,
  ensureAdmin,
  charactersController.create,
);

charactersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  ensureAdmin,
  charactersController.delete,
);

charactersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      age: Joi.number().integer().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  ensureAdmin,
  characterController.update,
);

charactersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  characterController.index,
);

charactersRouter.patch(
  '/:id/profile',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  ensureAdmin,
  upload.single('avatar'),
  characterProfileController.update,
);

charactersRouter.patch(
  '/:id/banner',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  ensureAdmin,
  upload.single('avatar'),
  characterBannerController.update,
);

export default charactersRouter;
