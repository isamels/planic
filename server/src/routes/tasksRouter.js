import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../middleware/auth.js';
import * as tasksController from '../controllers/tasksController.js';

const tasksRouter = Router();

tasksRouter.get('/', authenticate, asyncHandler(tasksController.tasksGet));
tasksRouter.post('/', authenticate, asyncHandler(tasksController.tasksPost));
tasksRouter.get('/:id', authenticate, asyncHandler(tasksController.taskGet));
tasksRouter.put('/:id', authenticate, asyncHandler(tasksController.taskPut));
tasksRouter.delete('/:id', authenticate, asyncHandler(tasksController.taskDelete));

export default tasksRouter;