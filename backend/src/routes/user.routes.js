import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAllUserUrlsController } from '../controllers/user.controllers.js';

const UserRoutes = express.Router();

UserRoutes.get('/urls', authMiddleware, getAllUserUrlsController);

export { UserRoutes };