import express from 'express';
import AuthPage from '../controllers/auth/auth.js';
import LoginComponent from '../controllers/auth/loginComponent.js';
import SignupComponentController from '../controllers/auth/signupComponent.js';

const authRouter = express.Router();

// pages
authRouter.get('/', AuthPage);

// api

// components

authRouter.get('/components/signin', LoginComponent);
authRouter.get('/components/signup', SignupComponentController);



export default authRouter;