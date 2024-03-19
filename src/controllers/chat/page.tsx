import ChatPage from "../../components/chat/chatPage.js";
import * as elements from 'typed-html';
import { Request, Response } from "express";
import RootComponent from "../../components/root/header.js";

const ChatPageController = (req: Request, res: Response) => {
    const page = <RootComponent title="Chat">
        <ChatPage chats={[1,2,3,4,5,6,7,8,9,10,11.12,13,14]} />
    </RootComponent>
    res.send("<!DOCTYPE html>\n" + page);

};

export default ChatPageController;