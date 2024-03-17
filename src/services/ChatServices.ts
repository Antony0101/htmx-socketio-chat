import { Types } from "mongoose";
import ChatProfileModel, { ChatProfileDocument } from "../models/chatProfile.js";
import ChatModel, { ChatDocument } from "../models/chat.js";
import MessageModel, { MessageDocument, MessageEntity } from "../models/message.js";

const createChatProfile =
async (
    userId: Types.ObjectId,
    name: string,
    photo: string,
): Promise<ChatProfileDocument> => {
    const profile = new ChatProfileModel({
        userId,
        name,
        profilePicture: photo,
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await profile.save();
    return profile;
}

const updateChatProfile = 
    async (
        userId: Types.ObjectId,
        name: string | undefined,
        photo: string | undefined,
    ): Promise<ChatProfileDocument> => {
        const profile = await ChatProfileModel.findOneAndUpdate(
            { userId: userId },
            {
                $set: {
                    name: name,
                    profilePicture: photo,
                    updatedAt: new Date(),
                },
            },
            { new: true },
        );
        // if (!profile)
            // throw generateAPIError("userId is invalid", errorCodes.NotFound);
        return profile!;
    }

const getChatProfile =
    async (
        userId: Types.ObjectId,
    ): Promise<ChatProfileDocument> => {
        const profile = await ChatProfileModel.findOne({ userId: userId });
        // if (!profile)
        //     throw generateAPIError("userId is invalid", errorCodes.NotFound);
        return profile!;
    }

const getSingleChat =
    async (
        candidateId: Types.ObjectId,
        recruiterId: Types.ObjectId,
    ) => {
        const chat = await ChatModel.findOne(
            {
                $and: [
                    { users: { $elemMatch: { userId: candidateId } } },
                    { users: { $elemMatch: { userId: recruiterId } } },
                ],
            },
            { _id: 1, users: 1 },
        );
        return chat;
    }

const getChats =
    async (chatProfileId: Types.ObjectId) => {
        const chats = await ChatModel.find(
            { users: { $elemMatch: { chatProfileId: chatProfileId } } },
            {},
            { sort: { lastMessageAt: -1 }, },
        )
            .populate("lastMessage")
            .populate("users.chatProfileId");
        // populate or aggreagate users in chat to get user details as only the group chat has photo and name not private chat . for private chat you have to use photo and name of the other user.
        const chatObjects = chats.map((chat) => chat.toObject());
        const modifiedChatObjects = chatObjects.map((chat:any) => {
            const chatObj: typeof chat & {
                icon?: string;
                name?: string;
                users: {
                    profileId: { profilePicture: string; name: string };
                }[];
            } = chat as any;
            chat.users = chat.users.filter(
                (user:any) => user.chatProfileId?.toString() !== chatProfileId?.toString(),
            );
            if (chat.type === "private") {
                (chatObj.icon = chatObj.users[0].profileId.profilePicture),
                    (chatObj.name = chatObj.users[0].profileId.name);
            }
            return chat;
        });
        return modifiedChatObjects;
    }

const getMessages = 
    async (
        chatId: Types.ObjectId,
        chatProfileId: Types.ObjectId,
        pageNo: number,
        pageSize: number,
    ): Promise<{
        messages: MessageDocument[];
        count: number;
        chat: ChatDocument;
    }> => {
        const chat = await ChatModel.findOne({ _id: chatId });
        if (!chat)
            throw new Error("chatId is invalid");
        const index = chat.users.findIndex((obj) => {
            return obj.chatProfileId?.toString() === chatProfileId.toString();
        });
        if (index === -1)
            throw new Error("chatProfileId is invalid");
        const count = await MessageModel.countDocuments(
            { chatId: chatId },
        );
        const messages = await MessageModel.find(
            { chatId: chatId },
            {},
            { sort: { createdAt: -1 },},
        )
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .populate("senderProfile");
        // populate sender path with user details
        return { messages, count, chat };
    }

const createChat =
    async (
        type: "private" | "group",
        chatProfileIds: Types.ObjectId[],
        details: {
            name?: string;
            photo?: string;
        },
    ): Promise<ChatDocument> => {
        if (type === "private" && chatProfileIds.length !== 2)
            throw new Error("private chat must have 2 users");
        if (type === "group" && chatProfileIds.length < 2)
            throw new Error("group chat must have at least 2 users");
        if (type === "private") {
            const chat = await ChatModel.findOne({
                type: "private",
                users: {
                    $all: [
                        { $elemMatch: { chatProfileId: chatProfileIds[0] } },
                        { $elemMatch: { chatProfileId: chatProfileIds[1] } },
                    ],
                },
            });
            if (chat) return chat;
            // throw generateAPIError(
            //     "private chat already exists",
            //     errorCodes.ActionNotPermitted,
            // );
        }
        const users = await Promise.all(
            chatProfileIds.map(async (chatProfileId) => {
                const profile = await ChatProfileModel.findOne(
                    { _id: chatProfileId },
                );
                if (!profile)
                    throw new Error("chatProfileId is invalid");
                return { unread: 0, chatProfileId: profile._id };
            }),
        );
        const chat = new ChatModel({
            type,
            users,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (chat.type === "group") {
            chat.name = details.name ? details.name : "default group name";
            chat.icon = details.photo ? details.photo : "default group icon";
        }
        await chat.save();
        return chat;
    }

const createMessage =
    async (
        chatId: Types.ObjectId,
        chatProfileId: Types.ObjectId,
        message: { messageType: string; message: string },
    ): Promise<{ message: MessageEntity &  {senderProfile?:any}; room: string }> => {
        const profile = await ChatProfileModel.findOne({ _id: chatProfileId });
        if (!profile)
            throw new Error("userId is invalid");
        const messageDoc = new MessageModel({
            chatId,
            senderId: chatProfileId,
            messageType: message.messageType,
            message: message.message,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await messageDoc.save();
        // update chat lastMessageAt
        const chat = await ChatModel.findOneAndUpdate(
            { _id: chatId },
            {
                $set: {
                    lastMessage: messageDoc._id,
                    lastMessageAt: new Date(),
                },
            },
        );
        const messageDocObj: MessageEntity & {senderProfile?:any} = messageDoc.toObject();
        messageDocObj.senderProfile = profile as unknown as Types.ObjectId;
        if (!chat)
            throw new Error("chatId is invalid");
        let socketroom = `to-${chatId.toString()}`;
        if (chat.type === "private") {
            const index = chat.users.findIndex((obj) => {
                return obj.chatProfileId?.toString() !== chatProfileId.toString();
            });
            socketroom = `to-${chat.users[index].chatProfileId?.toString()}`;
        }
        return { message: messageDocObj, room: socketroom };
    }

const addMemberToGroup =
    async (
        chatId: Types.ObjectId,
        chatProfileId: Types.ObjectId,
    ): Promise<{ room: string }> => {
        const chat = await ChatModel.findOne({ _id: chatId });
        if (!chat)
            throw new Error("chatId is invalid");
        if (chat.type !== "group")
            throw new Error("chat is not a group chat");
        const index = chat.users.findIndex((obj) => {
            return obj.chatProfileId?.toString() === chatProfileId.toString();
        });
        if (index !== -1)
            throw new Error("user is already a member of this group");
        const profile = await ChatProfileModel.findOne({ _id: chatProfileId });
        if (!profile)
            throw new Error("chatProfileId is invalid");
        chat.users.push({ unread: 0, chatProfileId: profile._id });
        await chat.save();
        return { room: `to-${chat.users[index].chatProfileId?.toString()}` };
    }

const removeMemberFromGroup =
    async (
        chatId: Types.ObjectId,
        chatProfileId: Types.ObjectId,
    ) => {
        const chat = await ChatModel.findOne({ _id: chatId });
        if (!chat)
            throw new Error("chatId is invalid");
        if (chat.type !== "group")
            throw new Error("chat is not a group chat");
        const index = chat.users.findIndex((obj) => {
            return obj.chatProfileId?.toString() === chatProfileId.toString();
        });
        if (index === -1)
            throw new Error("user is not a member of this group");
        chat.users.splice(index, 1);
        await chat.save();
        return { room: `to-${chat.users[index].chatProfileId?.toString()}` };
    }

const deleteMessage =
    async (
        messageId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<{ messageId: Types.ObjectId; room: string }> => {
        const message = await MessageModel.findOne({ _id: messageId });
        if (!message)
            throw new Error("messageId is invalid");
        if (message.senderId.toString() !== userId.toString())
            throw new Error("userId is not authorized to delete this message");
        const chat = await ChatModel.findOne({ _id: message.chatId });
        if (!chat)
            throw new Error("chatId is invalid");
        if (chat.lastMessage?.toString() === messageId.toString()) {
            const lastMessage = await MessageModel.findOne(
                { chatId: message.chatId },
                {},
                { sort: { createdAt: -1 }},
            ).skip(1);
            if (lastMessage) {
                await ChatModel.findOneAndUpdate(
                    { _id: message.chatId },
                    {
                        $set: {
                            lastMessage: lastMessage._id,
                            lastMessageAt: lastMessage.createdAt,
                        },
                    },
                );
            } else {
                await ChatModel.findOneAndUpdate(
                    { _id: message.chatId },
                    { $unset: { lastMessage: "", lastMessageAt: "" } },
                );
            }
        }
        await MessageModel.deleteOne(
            { _id: messageId },
        );
        // if(message.messageType === "image"){
        //     // delete image from s3
        // }
        if (chat.type === "group") {
            return { messageId: messageId, room: `to-${chat._id.toString()}` };
        }
        const index = chat.users.findIndex((obj) => {
            return obj.chatProfileId?.toString() !== userId.toString();
        });
        return {
            messageId: messageId,
            room: `to-${chat.users[index].chatProfileId?.toString()}`,
        };
    }

export default {
    createChatProfile,
    updateChatProfile,
    getChatProfile,
    getChats,
    getMessages,
    createChat,
    createMessage,
    addMemberToGroup,
    removeMemberFromGroup,
    deleteMessage,
    getSingleChat,
};
