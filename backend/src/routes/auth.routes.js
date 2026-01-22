import express from 'express';
import passport from 'passport';
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
  googleAuthController,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const AuthRoutes = express.Router();

// Local auth
AuthRoutes.post('/signup', signupController);
AuthRoutes.post('/login', loginController);
AuthRoutes.post('/logout', logoutController);

// Google OAuth
AuthRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

AuthRoutes.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'http://localhost:5173/auth',
  }),
  googleAuthController
);

// Protected route
AuthRoutes.get('/me', authMiddleware, getCurrentUserController);

export { AuthRoutes };
