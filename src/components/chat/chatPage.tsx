import RootComponent from "../../components/root/header.js";
import * as elements from 'typed-html';

const ChatPage = <RootComponent title="Chat">
       <div class="flex flex-col">
        <div class="flex justify-center pt-10">
            <h1 class="text-center text-5xl pt-5">Chat</h1>
        </div>
        <div class="flex justify-center pt-10">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><a href="/auth">Auth</a></button>
        </div>
       </div>
    </RootComponent>;

export default ChatPage;