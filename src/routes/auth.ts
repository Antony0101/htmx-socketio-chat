import express from 'express';
import AuthPage from '../controllers/auth/auth.js';
import LoginComponent from '../controllers/auth/loginComponent.js';
import SignupComponentController from '../controllers/auth/signupComponent.js';
import loginApiController from '../controllers/auth/loginApi.js';
import signupApiController from '../controllers/auth/signupApi.js';

const authRouter = express.Router();

// pages
authRouter.get('/', AuthPage);

// api

authRouter.post('/api/login', loginApiController);
authRouter.post('/api/signup', signupApiController);

// components

authRouter.get('/components/signin', LoginComponent);
authRouter.get('/components/signup', SignupComponentController);



export default authRouter;