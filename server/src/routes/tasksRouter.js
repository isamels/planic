import { Router } from 'express';
import * as tasksController from '../controllers/tasksController.js';

const tasksRouter = Router();

tasksRouter.get('/', tasksController.tasksGet);
tasksRouter.post('/', tasksController.tasksPost);
tasksRouter.get('/:id', tasksController.taskGet);
tasksRouter.patch('/:id', tasksController.taskPatch);
tasksRouter.delete('/:id', tasksController.taskDelete);

export default tasksRouter;