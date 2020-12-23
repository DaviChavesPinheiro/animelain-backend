import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
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

animesRouter.post('/', animesController.create);

animesRouter.put('/:id', animeController.update);

animesRouter.get('/:id', animeController.index);

animesRouter.patch(
  '/:id/profile',
  ensureAuthenticated,
  upload.single('avatar'),
  animeProfileController.update,
);

animesRouter.patch(
  '/:id/banner',
  ensureAuthenticated,
  upload.single('avatar'),
  animeBannerController.update,
);

export default animesRouter;
