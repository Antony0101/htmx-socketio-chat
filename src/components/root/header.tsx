import { Children, } from "typed-html";
import * as elements from 'typed-html';

const RootComponent = (props:{title:string},children:Children) => {
    return (
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://unpkg.com/htmx.org@1.9.10"></script>
            {/* dev-code-start */}
            <script src="http://localhost:3000/dev-script"></script>
            {/* dev-code-end */}
            <script src="http://localhost:3000/js/extra.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <title>{props.title}</title>
        </head>
        <body>
            {children}
        </body>
        </html>
    );
}

export default RootComponent;
