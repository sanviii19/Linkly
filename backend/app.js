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
import AnalyticsRouter from './src/routes/analytics.routes.js';

const app = express();

app.use(passport.initialize());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
});

// app.use(passport.initialize());

app.use('/api/auth', AuthRoutes);
app.use('/api/create', ShortUrlRouter);
app.use('/api/user', UserRoutes);
app.use("/api/analytics", AnalyticsRouter);

// GET - Redirect short URL
app.get('/:id', redirectFromShortUrlController);
app.use(errorHandler);

app.listen(3000, () => {
    connectDB();
  console.log(`Server is running on ${process.env.BACKEND_URL || 'http://localhost:3000'}`);
});


