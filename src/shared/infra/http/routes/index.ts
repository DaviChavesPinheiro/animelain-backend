import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import animesRouter from '../../../../modules/animes/infra/http/routes/animes.routes';

const router = Router();

router.use('/animes', animesRouter);
router.use('/users', usersRouter);

export default router;
