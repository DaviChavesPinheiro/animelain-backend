import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.post('/', ensureAuthenticated, categoriesController.create);

export default categoriesRouter;
