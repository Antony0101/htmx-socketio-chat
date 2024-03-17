import { Types } from "mongoose";
import { Server, Socket } from "socket.io";

export type ServerToClientEvents = {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    usersOnline: (onlineUsers: Types.ObjectId[]) => void;
    userStatusChange: (data: {
        status: "online" | "offline";
        userId: Types.ObjectId;
    }) => void;
    newMessage: (message: any) => void;
    messageDeleted: (messageId: Types.ObjectId) => void;
};

export type ClientToServerEvents = {
    hello: () => void;
    createMessage: (message: any, callback: (message: any) => void) => void;
    deleteMessage: (messageId: Types.ObjectId, userId: Types.ObjectId) => void;
};

export type InterServerEvents = {
    ping: () => void;
};

export type SocketData = {
    session: any;
    name: string;
    age: number;
};

export type SocketInstance = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

export type ServerInstance = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;
