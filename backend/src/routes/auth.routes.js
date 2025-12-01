import express from 'express';
import { loginController, signupController } from '../controllers/auth.controllers.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/signup', signupController);
AuthRoutes.post('/login', loginController);

export { AuthRoutes };