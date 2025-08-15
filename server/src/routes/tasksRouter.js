import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as tasksController from '../controllers/tasksController.js';

const tasksRouter = Router();

tasksRouter.get('/', asyncHandler(tasksController.tasksGet));
tasksRouter.post('/', asyncHandler(tasksController.tasksPost));
tasksRouter.get('/:id', asyncHandler(tasksController.taskGet));
tasksRouter.put('/:id', asyncHandler(tasksController.taskPut));
tasksRouter.delete('/:id', asyncHandler(tasksController.taskDelete));

export default tasksRouter;