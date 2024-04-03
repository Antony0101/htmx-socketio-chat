import { Children, } from "typed-html";
import * as elements from 'typed-html';

const RootComponent = (props:{title:string, jsLink:string | null}) => {
    const NODE_ENV = process.env.NODE_ENV;
    return (
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://unpkg.com/htmx.org@1.9.10"></script>
            {NODE_ENV==='development' && <script src="/dev-script"></script>}
            {/* dev-code-start */}
            {/* <script src="http://localhost:3000/dev-script"></script> */}
            {/* dev-code-end */}
            <script src="/js/extra.js"></script>
            {props.jsLink && <script src={props.jsLink}></script>}
            <script src="https://cdn.tailwindcss.com"></script>
            <title>{props.title}</title>
        </head>
    );
}

export default RootComponent;
