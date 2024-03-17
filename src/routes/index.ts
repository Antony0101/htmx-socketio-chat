import express from 'express';
import homeRouter from './home.js';
import authRouter from './auth.js';

const indexRoot = express.Router();

indexRoot.use("/", homeRouter)
indexRoot.use("/auth", authRouter)
// dev-code-start
indexRoot.get('/dev-script', (req, res) => {
    res.sendFile('dev-script.js', { root: 'src/dev' });
});
// dev-code-end

export default indexRoot;