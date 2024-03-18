import express from 'express';
import HomePageController from '../controllers/home/home.js';

const homeRouter = express.Router();

homeRouter.get('/', HomePageController);

export default homeRouter;