import { Request, Response } from "express";
import HomePage from "../../components/root/page.js";


const HomePageController = (req: Request, res: Response) => {
    
    res.send("<!DOCTYPE html>\n" + HomePage);

};

export default HomePageController;