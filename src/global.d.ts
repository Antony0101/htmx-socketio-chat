declare global {
    type chatProfile = import("./models/chatProfile.js").ChatProfileEntity;
    namespace Express {
        interface Request {
            isAuthenticated: boolean;
            user: chatProfile & { _id: any };
        }
    }
}

export {}