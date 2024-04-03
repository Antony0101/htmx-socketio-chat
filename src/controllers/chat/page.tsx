// import ChatPage from "../../components/chat/chatPage.js";
// import * as elements from 'typed-html';
// import { Request, Response } from "express";
// import RootComponent from "../../components/root/header.js";
// import chatServices from "../../services/ChatServices.js";
// import expressWrapper from "../../lib/errorWrapper.js";

// const ChatPageController = expressWrapper(async(req: Request, res: Response) => {
//     const user = req.user;
//     const chats = await chatServices.getChats(user._id);
//     // console.log(chats);
//     const page = <RootComponent title="Chat">
//         <ChatPage chats={chats} />
//     </RootComponent>
//     res.send("<!DOCTYPE html>\n" + page);

// });

// export default ChatPageController;