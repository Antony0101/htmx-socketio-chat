import { Types } from "mongoose";
import ChatServices from "../services/ChatServices.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI || '').then(() => {}).catch((err) => console.error('Error connecting to MongoDB', err));

const addMessages = async () => {
    console .log("Adding Messages");
   await ChatServices.createMessage("6607bd6e03ed6237754d1f7b" as unknown as Types.ObjectId, "6607bd6e03ed6237754d1f76" as unknown as Types.ObjectId, {messageType: "text", message: "Hello"});
   await ChatServices.createMessage("6607bd6e03ed6237754d1f7b" as unknown as Types.ObjectId, "6607bd6e03ed6237754d1f76" as unknown as Types.ObjectId, {messageType: "text", message: "Hello1"});
   await ChatServices.createMessage("6607bd6e03ed6237754d1f7b" as unknown as Types.ObjectId, "6607bd6e03ed6237754d1f76" as unknown as Types.ObjectId, {messageType: "text", message: "Hello3"});
   await ChatServices.createMessage("6607bd6e03ed6237754d1f7b" as unknown as Types.ObjectId, "65fab4172bc876647f4f1192" as unknown as Types.ObjectId, {messageType: "text", message: "Hello4"});
   await ChatServices.createMessage("6607bd6e03ed6237754d1f7b" as unknown as Types.ObjectId, "65fab4172bc876647f4f1192" as unknown as Types.ObjectId, {messageType: "text", message: "Hello5"});
   console.log("Messages Added");
}

addMessages().then(() => {process.exit(0)}).catch((err) => {console.error(err); process.exit(1)});