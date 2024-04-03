import * as elements from 'typed-html';

type Props = {
    chat: any;
};

const ChatComponent = (props:Props) => {
    const time =props.chat?.lastMessageAt as Date;
    // if time is less than 1 min show just now
    // if time is less than 1 day show time
    // else show date
    let timeString = "";
    if(Date.now() - time.getTime() < 1000*60) {
        timeString = "now";
    }
    else if(Date.now() - time.getTime() < 1000*60*60*24) {
        timeString = time.getHours() + ":" + time.getMinutes();
    }
    else {
        timeString = time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear();
    }
    return (
        <div class="flex justify-between border-2 p-4">
            <div class='flex justify-start gap-1'>
                <div>
                    <img src={props.chat?.icon} alt="profile picture" class='rounded-xl w-9 h-9 border-2 border-gray-500' />
                </div>
                <div class='flex flex-col justify-between'>
                    <h3 class="text-sm">{props.chat?.name || "sample"}</h3>
                    <p class="text-xs">{props.chat?.lastMessage?.message || ""}</p>
                </div>
            </div>
            {/* <div >
                <p class="text-sm">lastmaessage</p>
            </div> */}
            <div class="flex flex-col justify-end">
                <p class="text-xs">{timeString}</p>
            </div>
        </div>
    )
};

export default ChatComponent;