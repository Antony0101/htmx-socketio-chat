import express from 'express';
import homeRouter from './home.js';
import authRouter from './auth.js';

const indexRoot = express.Router();

indexRoot.use("/", homeRouter)
indexRoot.use("/auth", authRouter)

export default indexRoot;