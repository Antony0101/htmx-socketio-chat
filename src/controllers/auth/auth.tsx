import { Request, Response } from "express";
import * as elements from 'typed-html';
import RootComponent from "../../components/root/header.js";
import SigninComponent from "../../components/auth/signin.js";
import AuthPage from "../../pages/Auth/page.js";
import AuthLayout from "../../pages/Auth/layout.js";


const AuthPageController = (req: Request, res: Response) => {
    res.send(
      <AuthLayout jsLink="/js/auth/page.js">
          <AuthPage></AuthPage>
      </AuthLayout>
    )
};


export default AuthPageController;