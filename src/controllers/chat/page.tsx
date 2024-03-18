import ChatPage from "../../components/chat/chatPage.js";
import { Request, Response } from "express";

const ChatPageController = (req: Request, res: Response) => {
    
    res.send("<!DOCTYPE html>\n" + ChatPage);

};

export default ChatPageController;