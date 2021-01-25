import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from '../controllers/UsersAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersAvatarController = new UsersAvatarController();

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
