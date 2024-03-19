import * as elements from 'typed-html';

type Props = {
    chat: any;
};

const ChatComponent = (props:Props) => {
    return (
        <div class="flex justify-between border-2 p-4">
            <div class='flex justify-start gap-1'>
                <div>
                    <img src="/profiles/1697107.png" alt="profile picture" class='rounded-xl w-9 h-9 border-2 border-gray-500' />
                </div>
                <div class='flex flex-col justify-between'>
                    <h3 class="text-sm">name</h3>
                    <p class="text-xs">lastmaessage</p>
                </div>
            </div>
            {/* <div >
                <p class="text-sm">lastmaessage</p>
            </div> */}
            <div class="flex flex-col justify-end">
                <p class="text-xs">time</p>
            </div>
        </div>
    )
};

export default ChatComponent;