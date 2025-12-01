import express from 'express';
import { createCustomShortUrlController, createShortUrlController } from '../controllers/shorturl.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const ShortUrlRouter = express.Router();

// POST - create short URL
ShortUrlRouter.post("/", authMiddleware, createShortUrlController);
ShortUrlRouter.post("/", authMiddleware, createCustomShortUrlController);

export default ShortUrlRouter;