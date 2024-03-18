import { Request, Response } from "express";
import * as elements from 'typed-html';
import ChatProfileModel from "../../models/chatProfile.js";
import SignupComponent from "../../components/auth/signup.js";
import fs from 'fs';
import crypto from 'crypto';
import {hashPassword} from "../../lib/bcrypt.js"
import expressWrapper from "../../lib/errorWrapper.js";

const signupApiController = expressWrapper(async (req: Request, res: Response) => {
    const { username, password, confirmPassword } = req.body;
    
    const chatProfile = await ChatProfileModel.findOne({ username });
    if(chatProfile) {
        return res.status(400).send(<SignupComponent values={{username,password}}  errors={{username:"User already exist"}}></SignupComponent>);
    }
    if(password !== confirmPassword) {
        return res.status(400).send(<SignupComponent values={{username,password}}  errors={{confirmPassword:"Password does not match"}}></SignupComponent>);
    }
    const filelist = fs.readdirSync('static/profiles');
    const image = "/profiles/" + filelist[crypto.randomInt(0,filelist.length)]
    const hashedPassword = await hashPassword(password);
    await ChatProfileModel.create({ username, password:hashedPassword, profilePicture: image, name: username, lastSeen: new Date() });
    res.redirect("/chat");
});

export default signupApiController;