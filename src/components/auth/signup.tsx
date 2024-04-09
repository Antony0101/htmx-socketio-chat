import * as elements from 'typed-html';

type Props = {
    values?: {
        username?: string;
        password?: string;
        confirmPassword?: string;
    };
    errors?:{
        username?: string;
        password?: string;
        confirmPassword?: string;
    };
}


const SignupComponent = (props:Props) => {
    return (
             <div id="auth-inner-box" class="flex justify-center items-center mt-5">
                <div class="rounded p-2 border-4 border-slate-950">
                    <form hx-post="/auth/api/signup" hx-target="#auth-inner-box" hx-swap="outerHTML"  class="flex flex-col pt-10">
                        <label for="username" class="self-start">username</label>
                        <input name='username' id='username' type="text" class="border-2 border-slate-950 p-2 rounded" placeholder="Username" value={props?.values?.username || ''} />
                        {props?.errors?.username && <p class="text-red-500">{props?.errors?.username}</p>}
                        <label for="password" class="self-start mt-5">password</label>
                        <input name="password" id='password' type="password" class="border-2 border-slate-950 p-2 rounded " placeholder="Password" value={props?.values?.password || ''} />
                        {props?.errors?.password && <p class="text-red-500">{props?.errors?.password}</p>}
                        <label for="confirmPassword" class="self-start mt-5">password</label>
                        <input name="confirmPassword" id='confirmPassword' type="password" class="border-2 border-slate-950 p-2 rounded mt-5" placeholder="Password" value={props?.values?.confirmPassword || ''} />
                        {props?.errors?.confirmPassword && <p class="text-red-500">{props?.errors?.confirmPassword}</p>}
                        <button type="submit" class="border-2 border-slate-950 p-2 rounded mt-5">Sign up</button>
                    </form>
                    <div>
                        <button hx-get="/auth/components/signin" hx-trigger="click" hx-target="#auth-inner-box" hx-swap="outerHTML">
                            <span>If you already have an account,</span> <span class='text-blue-600'>sign in here</span>
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default SignupComponent;