import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import animesRouter from '../../../../modules/animes/infra/http/routes/animes.routes';

const router = Router();

router.use('/animes', animesRouter);
router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export default router;
