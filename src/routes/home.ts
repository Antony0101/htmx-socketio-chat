import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (async (req, res) => {
    res.redirect('/auth');
}));

export default homeRouter;