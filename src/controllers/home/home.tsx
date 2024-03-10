import { Request, Response } from "express";
import RootComponent from "../../components/root/header.js";
import * as elements from 'typed-html';

const HomePage = (req: Request, res: Response) => {
    const HomePage = <RootComponent title="Home">
        <h1 class="text-center text-5xl pt-5">Home1</h1>
        <p class="text-center text-3xl pt-10">Welcome to the home page</p>
        <div class="flex justify-center pt-10">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><a href="/auth">Auth</a></button>
        </div>
    </RootComponent>;
    res.send("<!DOCTYPE html>\n" + HomePage);

};

export default HomePage;