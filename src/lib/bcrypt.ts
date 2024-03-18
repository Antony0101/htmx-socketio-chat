import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
    const saltrounds = 12;
    const salt = await bcrypt.genSalt(saltrounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const comparePassword = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };