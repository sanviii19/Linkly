import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import passport from 'passport';
import './src/config/passport.config.js';
import connectDB from './src/config/mongodb.config.js';
import ShortUrlRouter from './src/routes/shorturl.routes.js';
import { redirectFromShortUrlController } from './src/controllers/shorturl.controllers.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';
import { AuthRoutes } from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { UserRoutes } from './src/routes/user.routes.js';

const app = express();

app.use(passport.initialize());

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// app.use(passport.initialize());

app.use('/api/auth', AuthRoutes);
app.use('/api/create', ShortUrlRouter);
app.use('/api/user', UserRoutes);
// GET - Redirect short URL
app.get('/:id', redirectFromShortUrlController);
app.use(errorHandler);

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on http://localhost:3000');
});


