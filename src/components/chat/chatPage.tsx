import * as elements from 'typed-html';
import ChatComponent from './chatComponent.js';
type Props = {
    chats: any[];
};

const ChatPage = (props:Props, )=> {
    return(
       <div class="flex justify-start h-screen">
            <div class="w-1/5 overflow-scroll">
                <div class="flex flex-col">
                    {props.chats.map((chat, index) => {
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