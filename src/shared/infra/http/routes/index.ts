import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import favoritesRouter from '@modules/users/infra/http/routes/favorites.routes';
import animesRouter from '../../../../modules/animes/infra/http/routes/animes.routes';
import categoriesRouter from '../../../../modules/categories/infra/http/routes/categories.routes';
import charactersRouter from '../../../../modules/characters/infra/http/routes/characters.routes';

const router = Router();

router.use('/animes', animesRouter);
router.use('/users', usersRouter);
router.use('/password', passwordRouter);
router.use('/sessions', sessionsRouter);
router.use('/profile', profileRouter);
router.use('/favorites', favoritesRouter);
router.use('/categories', categoriesRouter);
router.use('/characters', charactersRouter);

export default router;
