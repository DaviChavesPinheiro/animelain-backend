import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AnimesController from '../controllers/AnimesController';

const animesRouter = Router();
const animesController = new AnimesController();

animesRouter.use(ensureAuthenticated);

animesRouter.get('/', animesController.index);

animesRouter.post('/', animesController.create);

export default animesRouter;
