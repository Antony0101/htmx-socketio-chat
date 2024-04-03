import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "./jwt.js";
import ChatProfileModel from "../models/chatProfile.js";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const auth = req.cookies.auth;
    if(!auth) {
        return res.redirect("/auth");
    }
    // verify jwt
    // if jwt is invalid then redirect to login
    // if jwt is valid then call next
    const payload = verifyJwt(auth);
    if(!payload) {
        return res.redirect("/auth");
    }
    req.isAuthenticated = true;
    const chatProfile = await ChatProfileModel.findById(payload.uid);
    if(!chatProfile) {
        return res.redirect("/auth");
    }
    req.user = chatProfile.toObject();
    next();
}

export default authMiddleware;