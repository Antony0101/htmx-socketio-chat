import { Children, } from "typed-html";
import * as elements from 'typed-html';

type Props = {
    values?: {
        username?: string;
        password?: string;
    };
    errors?:{
        username?: string;
        password?: string;
    };
}

const SigninComponent = (props:Props) => {
    return (
             <div id="auth-inner-box" class="flex justify-center items-center mt-5">
                <div class="rounded p-2 border-4 border-slate-950">
                    <h1 class="text-center text-5xl pt-5">Auth</h1>
                    <p class="text-center text-3xl pt-10">Welcome to the auth page</p>
                    <form hx-post="/auth/api/login" hx-target="#auth-inner-box" hx-swap="outerHTML" class="flex flex-col items-center pt-10">
                        <input name="username" type="text" class="border-2 border-slate-950 p-2 rounded" placeholder="Username" value={props?.values?.username || ''} />
                        {props?.errors?.username && <p class="text-red-500">{props?.errors?.username}</p>}
                        <input name="password" type="password" class="border-2 border-slate-950 p-2 rounded mt-5" placeholder="Password" value={props?.values?.password || ''} />
                        {props?.errors?.password && <p class="text-red-500">{props?.errors?.password}</p>}
                        <button type="submit" class="border-2 border-slate-950 p-2 rounded mt-5">Sign in</button>
                    </form>
                    <div>
                        <button hx-get="/auth/components/signup" hx-trigger="click" hx-target="#auth-inner-box" hx-swap="outerHTML">
                            If you don't have an account, sign up here
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default SigninComponent;