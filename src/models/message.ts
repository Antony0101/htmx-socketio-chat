import mongoose from "mongoose";
import { ExtractDocument, ExtractEntity } from "../lib/tsHelpers.js";

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatprofiles",
        required: true,
    },
    seen: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "auths",
                required: true,
            },
            seenAt: {
                type: Date,
                required: true,
            },
        },
    ],
    messageType: {
        type: String,
        enum: ["text", "image", "video", "audio", "file"],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

export type MessageDocument = ExtractDocument<typeof MessageModel>;

export type MessageEntity = ExtractEntity<typeof MessageModel>;

const MessageModel = mongoose.model("messages", MessageSchema);

export type MessageModelType = typeof MessageModel;

export default MessageModel;
