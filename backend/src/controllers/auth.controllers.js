import { cookieOptions } from '../config/config.js';
import { loginService, signupService } from '../services/auth.services.js';
import { signToken } from '../utils/jwtHelper.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

/**
 * LOCAL SIGNUP
 */
const signupController = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await signupService(name, email, password);

  req.user = user;
  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    isSuccess: true,
    message: 'User registered successfully',
    data: {
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
    },
  });
});

/**
 * LOCAL LOGIN
 */
const loginController = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginService(email, password);

  req.user = user;
  res.cookie('token', token, cookieOptions);

  res.status(200).json({
    isSuccess: true,
    message: 'User logged in successfully',
    data: {
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
    },
  });
});

/**
 * GOOGLE AUTH SUCCESS
 * Passport sets req.user
 */
const googleAuthController = wrapAsync(async (req, res) => {
  const user = req.user;

  const token = signToken(user);
  res.cookie('token', token, cookieOptions);

  // Redirect to frontend callback page
  res.redirect(`${process.env.FRONTEND_URL}auth/google/callback`);
});

/**
 * LOGOUT
 */
const logoutController = wrapAsync(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.status(200).json({
    isSuccess: true,
    message: 'User logged out successfully',
  });
});

/**
 * GET CURRENT USER
 * req.user set by auth middleware
 */
const getCurrentUserController = wrapAsync(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    isSuccess: true,
    message: 'Current user fetched successfully',
    data: {
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
        avatar: user.avatar,
        provider: user.provider,
      },
    },
  });
});

export {
  signupController,
  loginController,
  googleAuthController,
  logoutController,
  getCurrentUserController,
};
