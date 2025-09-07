import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../middleware/auth.js';
import * as availabilityController from '../controllers/availabilityController.js';

const availabilityRouter = Router();

availabilityRouter.get('/default-hours', authenticate, asyncHandler(availabilityController.defaultHoursGet));
availabilityRouter.post('/default-hours', authenticate, asyncHandler(availabilityController.defaultHoursPost));
availabilityRouter.get('/date-hours', authenticate, asyncHandler(availabilityController.dateHoursGet));
availabilityRouter.post('/date-hours', authenticate, asyncHandler(availabilityController.dateHoursPost));

export default availabilityRouter;