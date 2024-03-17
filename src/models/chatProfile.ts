import mongoose from "mongoose";
import { ExtractDocument, ExtractEntity } from "../lib/tsHelpers.js";

const ChatProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    lastSeen: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

const ChatProfileModel = mongoose.model("chatprofiles",ChatProfileSchema);

export type ChatProfileModelType = typeof ChatProfileModel;

export type ChatProfileEntity = ExtractEntity<typeof ChatProfileModel>;

export type ChatProfileDocument = ExtractDocument<typeof ChatProfileModel>;

export default ChatProfileModel;
