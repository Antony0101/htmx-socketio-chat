import { Request, Response } from "express";
import * as elements from 'typed-html';
import ChatProfileModel from "../../models/chatProfile.js";
import SigninComponent from "../../components/auth/signin.js";
import { comparePassword } from "../../lib/bcrypt.js";
import expressWrapper from "../../lib/errorWrapper.js";


const loginApiController =  expressWrapper(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const chatProfile = await ChatProfileModel.findOne({ username });
    if(!chatProfile) {
        return res.status(400).send(<SigninComponent values={{username,password}}  errors={{username:"Invalid User Id"}}></SigninComponent>);
    }
    const flag = comparePassword(password, chatProfile.password);
    if(!flag) {
        return res.status(400).send(<SigninComponent values={{username,password}}  errors={{password:"Invalid Password"}}></SigninComponent>);
    }
    res.redirect("/chat");
});

export default loginApiController;