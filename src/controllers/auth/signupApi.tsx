import { Request, Response } from "express";
import * as elements from 'typed-html';
import ChatProfileModel from "../../models/chatProfile.js";
import SignupComponent from "../../components/auth/signup.js";
import fs from 'fs';
import crypto from 'crypto';
import {hashPassword} from "../../lib/bcrypt.js"
import expressWrapper from "../../lib/errorWrapper.js";
import { setTokenInDb } from "./auth.helper.js";
import { createJwt } from "../../lib/jwt.js";
import ChatModel from "../../models/chat.js";

const signupApiController = expressWrapper(async (req: Request, res: Response) => {
    const { username, password, confirmPassword } = req.body;
    
    const chatProfile = await ChatProfileModel.findOne({ username });
    if(chatProfile) {
        return res.status(400).send(<SignupComponent values={{username,password}}  errors={{username:"User already exist"}}></SignupComponent>);
    }
    if(password !== confirmPassword) {
        return res.status(400).send(<SignupComponent values={{username,password}}  errors={{confirmPassword:"Password does not match"}}></SignupComponent>);
    }
    const allUSers = await ChatProfileModel.find();
    const filelist = fs.readdirSync('static/profiles');
    const image = "/profiles/" + filelist[crypto.randomInt(0,filelist.length)]
    const hashedPassword = await hashPassword(password);
    const newProfile = await ChatProfileModel.create({ username, password:hashedPassword, profilePicture: image, name: username, lastSeen: new Date() });
    const newChats = allUSers.map((user) => {
        return {
            type: "private",
            users: [
                {
                    chatProfileId: newProfile._id,
                    unread: 0,
                },
                {
                    chatProfileId: user._id,
                    unread: 0,
                },
            ],
            lastMessageAt: new Date(),
        }
    });
    await ChatModel.create(newChats);
    const token = await setTokenInDb(newProfile, new Date(Date.now() + 1000*60*60*24*3));
    const payload = {
        uid: newProfile._id,
        tid: token,
    }
    const jwt = createJwt(payload,"3d");
    res.cookie("auth", jwt, { httpOnly: true });
    res.header("HX-Redirect","/chat");
    res.status(204).send();
});

export default signupApiController;