import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.config.js';
import ShortUrlRouter from './src/routes/shorturl.routes.js';
import { redirectFromShortUrlController } from './src/controllers/shorturl.controllers.js';
import { error } from 'console';
import { errorHandler } from './src/utils/errorHandler.js';
dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create', ShortUrlRouter);
// GET - Redirect short URL
app.get('/:id', redirectFromShortUrlController);
app.use(errorHandler);

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on http://localhost:3000');
});


