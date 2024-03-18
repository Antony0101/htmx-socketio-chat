import express from 'express';
import ChatPageController from '../controllers/chat/page.js';

const chatRouter = express.Router();

// pages
chatRouter.get('/', ChatPageController);

// api



// components




export default chatRouter;