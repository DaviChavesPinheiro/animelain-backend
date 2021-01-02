import { Router } from 'express';
import NewAnimesController from '../controllers/NewAnimesController';

const newAnimesRouter = Router();

const newAnimesController = new NewAnimesController();

newAnimesRouter.get('/', newAnimesController.index);

export default newAnimesRouter;
