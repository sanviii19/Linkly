import express from 'express';
import { getCurrentUserController, loginController, logoutController, signupController } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/signup', signupController);
AuthRoutes.post('/login', loginController);
AuthRoutes.post('/logout', logoutController);
AuthRoutes.get('/me', authMiddleware, getCurrentUserController);

export { AuthRoutes };