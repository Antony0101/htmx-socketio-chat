import * as elements from "typed-html";
import RootComponent from "../../components/root/header.js";
import ChevronLeft from "../../components/svg/chevron-left.js";
import ChevronRight from "../../components/svg/chevron-right.js";

const AuthLayout = (props:{ jsLink:string | null},children:elements.Children) => {
    return "<!DOCTYPE html>\n" + (
        <html lang="en">
            <RootComponent title="Auth" jsLink={props.jsLink}></RootComponent>
            <body>
                <div class="flex w-[100vw] h-[100vh]">
                    <div class="w-1/2 bg-red-800 relative">
                        <div id="layout-image-container">
                            <img id="layout-image" src="/images/kenny-cinders.jpg" alt="auth" class="object-cover w-full h-[100vh] overflow-hidden"/>
                        </div>
                        <div class="flex justify-between absolute bottom-[50%] w-full pl-4 pr-4">
                            <button id="prev-button" onclick="layout.onClickPrev()"><ChevronLeft height="40" width="40"/></button>
                            <button id="next-button" onclick="layout.onClickNext()"><ChevronRight height="24" width="24"/></button>
                        </div>
                        <div id="dot-container" class="flex justify-center gap-1 absolute bottom-[5%] w-full pl-4 pr-4">
                            <div class="w-2 h-2 rounded-full bg-white/50"></div>
                            <div class="w-5 h-2 rounded-full bg-white"></div>
                        </div>
                    </div>
                    <div class="w-1/2">
                        {children}
                    </div>
                </div>
                <script src="/js/auth/layout.js"></script>
            </body>
        </html>
    )
};

export default AuthLayout;