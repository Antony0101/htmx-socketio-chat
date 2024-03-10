import { Request, Response } from "express";
import * as elements from 'typed-html';
import SignupComponent from "../../components/auth/signup.js";


const SignupComponentController = (req: Request, res: Response) => {
    const SignupComponentResponse =  <SignupComponent></SignupComponent>;
    res.send(SignupComponentResponse);
};


export default SignupComponentController;