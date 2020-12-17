import { Router } from 'express';

import animesRouter from '../../../../modules/animes/infra/http/routes/animes.routes';

const router = Router();

router.use('/animes', animesRouter);

export default router;
