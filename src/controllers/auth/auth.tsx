import { Request, Response } from "express";
import * as elements from 'typed-html';
import RootComponent from "../../components/root/header.js";
import SigninComponent from "../../components/auth/signin.js";


const AuthPage = (req: Request, res: Response) => {
    const AuthPage = <RootComponent title="Auth">
      <SigninComponent></SigninComponent>
    </RootComponent>;
    res.send("<!DOCTYPE html>\n" + AuthPage);
};


export default AuthPage;