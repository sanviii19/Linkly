import express from 'express';
import { createShortUrlController } from '../controllers/shorturl.controllers.js';

const ShortUrlRouter = express.Router();

// POST - create short URL
ShortUrlRouter.post("/", createShortUrlController);

export default ShortUrlRouter;