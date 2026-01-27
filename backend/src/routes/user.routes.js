import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAllUserUrlsController, updateUserUrlController } from '../controllers/user.controllers.js';

const UserRoutes = express.Router();

UserRoutes.get('/urls', authMiddleware, getAllUserUrlsController);
UserRoutes.put('/urls/:id', authMiddleware, updateUserUrlController);

export { UserRoutes };