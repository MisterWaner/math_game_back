import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

export async function hashPwd(password: string): Promise<string> {
    const salt: number = Number(process.env.BCRYPT_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export function comparePwd(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}