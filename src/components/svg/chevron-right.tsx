

import * as elements from "typed-html";

const ChevronRight = (props:{width:string,height:string}) => {
    return (
        // @ts-ignore
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
    )
}

export default ChevronRight;