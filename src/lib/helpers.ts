import sql from "better-sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../models/user.js";

config();

const db = sql("mathgame.db");


export async function hashPwd(password: string): Promise<string> {
    const salt: number = Number(process.env.BCRYPT_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePwd(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export async function authenticate(username: string, password: string) {
    const user: User = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as User;
    if (!user) return null

    const isPasswordCorrect = await comparePwd(password, user?.password);
    if (!isPasswordCorrect) return null;

    return user;
}

export async function generateToken(user: User | undefined): Promise<string> {
    const maxAge: number = 3600000; // 1 hour
    const secret: string = process.env.JWT_SECRET || "";
    const jwtToken = jwt.sign(
        {
            id: user?.id,
            username: user?.username,
            level: user?.level,
            age: user?.age,
        },
        secret,
        { expiresIn: maxAge }
    );
    return jwtToken;
}



