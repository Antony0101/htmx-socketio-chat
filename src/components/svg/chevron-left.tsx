import * as elements from "typed-html";

const ChevronLeft = (props:{width:string, height:string}) => {
    return (
        // @ts-ignore
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 40" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
    )
}


export default ChevronLeft;