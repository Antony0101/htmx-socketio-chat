import jwt from "jsonwebtoken";

const createJwt = (payload: any, time?: string):string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'abc', {
        expiresIn: time || "3d",
    });
    return token;
};

const verifyJwt = (token: string):any => {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'abc');
    return payload;
};

export {createJwt, verifyJwt}