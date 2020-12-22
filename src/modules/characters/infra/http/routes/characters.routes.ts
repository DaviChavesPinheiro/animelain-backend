import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();
const charactersController = new CharactersController();

charactersRouter.use(ensureAuthenticated);

charactersRouter.get('/', charactersController.index);

charactersRouter.post('/', charactersController.create);

export default charactersRouter;
