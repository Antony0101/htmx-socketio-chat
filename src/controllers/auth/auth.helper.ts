import { ChatProfileDocument } from "../../models/chatProfile.js";
import crypto from "crypto";

async function setTokenInDb(chatprofile:ChatProfileDocument, expiry:Date):Promise<string> {
    const tid = crypto.randomUUID();
    if(chatprofile.tokens.length >= 10) {
        chatprofile.tokens.shift();
    }
    chatprofile.tokens.push({
        tid,
        expiry,
    });
    await chatprofile.save();
    return tid;
}

export {setTokenInDb}