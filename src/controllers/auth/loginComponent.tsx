import { Request, Response } from "express";
import * as elements from 'typed-html';
import RootComponent from "../../components/root/header.js";
import SigninComponent from "../../components/auth/signin.js";


const LoginComponent = (req: Request, res: Response) => {
    const LoginComponentResponse =  <SigninComponent></SigninComponent>;
    res.send(LoginComponentResponse);
};


export default LoginComponent;