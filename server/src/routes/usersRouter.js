import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../middleware/auth.js';
import * as usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.post('/signup', asyncHandler(usersController.signupPost));
usersRouter.post('/login', asyncHandler(usersController.loginPost));
usersRouter.post('/logout', authenticate, asyncHandler(usersController.logoutPost));
usersRouter.get('/account', authenticate, asyncHandler(usersController.accountGet));
usersRouter.delete('/account', authenticate, asyncHandler(usersController.accountDelete));

export default usersRouter;