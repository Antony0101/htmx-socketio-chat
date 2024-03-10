import express from 'express';
import HomePage from '../controllers/home/home.js';

const homeRouter = express.Router();

homeRouter.get('/', HomePage);

export default homeRouter;