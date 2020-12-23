import { Router } from 'express';

import FavoritesController from '../controllers/FavoritesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const favoriteRouter = Router();
const profileController = new FavoritesController();

favoriteRouter.use(ensureAuthenticated);

favoriteRouter.post('/animes/add/:id', profileController.create);
favoriteRouter.delete('/animes/remove/:id', profileController.remove);

export default favoriteRouter;
