import * as elements from 'typed-html';
import { Request} from "express";
import ChatComponent from './chatComponent.js';
import chatServices from '../../services/ChatServices.js';
type Props = {
    req: Request;
};

const ChatPage = async ({req}:Props, )=> {
    const user = req.user;
    const chats = await chatServices.getChats(user._id);
    return(
       <div class="flex justify-start h-screen">
            <div class="w-1/5 overflow-scroll">
                <div class="flex flex-col">
                    {chats.map((chat, index) => {
                        return (
                            <ChatComponent chat={chat}></ChatComponent>
                        )
                    })}
                </div>
            </div>
            <div class="w-4/5 bg-yellow-500">
                <h1 class="text-5xl">Chat2</h1>
            </div>
       </div>
    )
}
export default ChatPage;