import express from 'express';
import { getCurrentUserController, loginController, signupController } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { get } from 'http';

const AuthRoutes = express.Router();

AuthRoutes.post('/signup', signupController);
AuthRoutes.post('/login', loginController);
AuthRoutes.get('/me', authMiddleware, getCurrentUserController);

export { AuthRoutes };