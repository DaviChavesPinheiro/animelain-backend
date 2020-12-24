import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
import AnimesController from '../controllers/AnimesController';
import AnimeController from '../controllers/AnimeController';
import AnimeProfileController from '../controllers/AnimeProfileController';
import AnimeBannerController from '../controllers/AnimeBannerController';

const animesRouter = Router();
const upload = multer(uploadConfig.multer);
const animesController = new AnimesController();
const animeController = new AnimeController();
const animeProfileController = new AnimeProfileController();
const animeBannerController = new AnimeBannerController();

animesRouter.use(ensureAuthenticated);

animesRouter.get('/', animesController.index);

animesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      episodesAmount: Joi.number().integer().required(),
    }),
  }),
  animesController.create,
);

animesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      episodesAmount: Joi.number().integer().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  animeController.update,
);

animesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  animeController.index,
);

animesRouter.patch(
  '/:id/profile',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  upload.single('avatar'),
  animeProfileController.update,
);

animesRouter.patch(
  '/:id/banner',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  upload.single('avatar'),
  animeBannerController.update,
);

export default animesRouter;
