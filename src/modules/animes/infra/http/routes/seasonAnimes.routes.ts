import { Router } from 'express';
import SeasonAnimesController from '../controllers/SeasonAnimesController';

const seasonAnimesRouter = Router();

const seasonAnimesController = new SeasonAnimesController();

seasonAnimesRouter.get('/', seasonAnimesController.index);

export default seasonAnimesRouter;
