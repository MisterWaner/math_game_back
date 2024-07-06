import sql from "better-sqlite3";
import { Request, Response } from "express";

import { User } from "../models/user.js";
import { hashPwd } from "../lib/helpers.js";
const db = sql("mathgame.db");

function getUsers(req: Request, res: Response) {
    const users = db.prepare("SELECT * FROM users").all() as User[];
    if (users.length === 0) {
        return res.status(404).send("Aucun utilisateur trouvé");
    }
    return res.status(200).json(users);
}

function getUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;
    if (user === undefined) {
        return res.status(404).send("Utilisateur introuvable");
    }
    return res.status(200).json(user);
}

async function createUser(req: Request, res: Response) {
    const { username, password, age, level } = req.body as User;
    if (!username || !password || !age || !level) {
        return res.status(400).send("Champs obligatoires manquants");
    }

    const confirmPassword: string = req.body.confirmPassword;
    if (confirmPassword !== password) {
        return res.status(400).send("Les mots de passe ne correspondent pas");
    }

    const hashedPassword = await hashPwd(password);

    const userExists = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (userExists) {
        return res.status(400).send("Ce nom d'utilisateur existe déjà");
    }
    
    const user = db.prepare("INSERT INTO users (username, password, age, level) VALUES (?, ?, ?, ?)").run(username, hashedPassword, age, level);

    return res.status(201).json(user);
}

async function updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { username, age, level } = req.body as User;
    if (!username || !age || !level) {
        return res.status(400).send("Champs obligatoires manquants");
    }
    
    const user = db.prepare("UPDATE users SET username = ?, age = ?, level = ? WHERE id = ?").run(username, age, level, id);

    return res.status(200).json(user);
}

function deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = db.prepare("DELETE FROM users WHERE id = ?").run(id);

    return res.status(200).json(user);
}

async function updateUserPassword(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { password } = req.body as User;
    const confirmPassword: string = req.body.confirmPassword;

    if (!password) {
        return res.status(400).send("Champs obligatoires manquants");
    }
    if (confirmPassword !== password) {
        return res.status(400).send("Les mots de passe ne correspondent pas");
    }
    
    const hashedPassword = await hashPwd(password);

    const user = db.prepare("UPDATE users SET password = ? WHERE id = ?").run(hashedPassword, id);

    return res.status(200).json(user);
}
export { getUsers, getUser, createUser, updateUser, deleteUser, updateUserPassword };
