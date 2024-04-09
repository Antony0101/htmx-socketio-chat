import * as elements from 'typed-html'
import SigninComponent from '../../components/auth/signin.js'

const AuthPage = () =>{
    return (
        <div >
            <div class="pt-16 text-center">
                <h1 class='text-3xl font-extrabold'>Chat App</h1>
            </div>
            <div class="flex justify-center pt-20">
                <h1 class="text-2xl font-bold">Welcome to Chat App</h1>
            </div>
            <div class="flex justify-center pt-10">
                <SigninComponent></SigninComponent>
            </div>
        </div>
    )
}

export default AuthPage

// <div>
// <SigninComponent></SigninComponent>
// </div>