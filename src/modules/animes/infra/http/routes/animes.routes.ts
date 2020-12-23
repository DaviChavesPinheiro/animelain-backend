import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AnimesController from '../controllers/AnimesController';
import AnimeController from '../controllers/AnimeController';

const animesRouter = Router();
const animesController = new AnimesController();
const animeController = new AnimeController();

animesRouter.use(ensureAuthenticated);

animesRouter.get('/', animesController.index);

animesRouter.post('/', animesController.create);

animesRouter.put('/:id', animeController.update);

animesRouter.get('/:id', animeController.index);

export default animesRouter;
