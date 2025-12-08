import express from 'express';
import { createCustomShortUrlController, createShortUrlController } from '../controllers/shorturl.controllers.js';
import { optionalAuthMiddleware } from '../middlewares/auth.middleware.js';

const ShortUrlRouter = express.Router();

// POST - create short URL (handles both regular and custom slug)
ShortUrlRouter.post("/", optionalAuthMiddleware, createShortUrlController);

export default ShortUrlRouter;