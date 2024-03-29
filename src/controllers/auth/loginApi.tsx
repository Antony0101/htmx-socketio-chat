import { Request, Response } from "express";
import * as elements from 'typed-html';
import ChatProfileModel from "../../models/chatProfile.js";
import SigninComponent from "../../components/auth/signin.js";
import { comparePassword } from "../../lib/bcrypt.js";
import expressWrapper from "../../lib/errorWrapper.js";
import { setTokenInDb } from "./auth.helper.js";
import { createJwt } from "../../lib/jwt.js";


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
    const token = await setTokenInDb(chatProfile, new Date(Date.now() + 1000*60*60*24*3));
    const payload = {
        uid: chatProfile._id,
        tid: token,
    }
    const jwt = createJwt(payload,"3d");
    res.cookie("auth", jwt, { httpOnly: true });
    res.redirect("/chat");
});

export default loginApiController;