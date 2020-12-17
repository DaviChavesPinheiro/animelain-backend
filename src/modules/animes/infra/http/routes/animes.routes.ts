import { Router } from 'express';
import AnimesController from '../controllers/AnimesController';

const animesRouter = Router();
const animesController = new AnimesController();

animesRouter.get('/', animesController.index);

animesRouter.post('/', animesController.create);

export default animesRouter;
