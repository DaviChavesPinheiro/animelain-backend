import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import animesRouter from '../../../../modules/animes/infra/http/routes/animes.routes';

const router = Router();

router.use('/animes', animesRouter);
router.use('/users', usersRouter);
router.use('/password', passwordRouter);
router.use('/sessions', sessionsRouter);
router.use('/profile', profileRouter);

export default router;
