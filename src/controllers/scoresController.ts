import sql from "better-sqlite3";
import { Request, Response } from "express";

import { User } from "../models/user.js";

const db = sql("mathgame.db");

function fetchUsersDailyScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY daily_score DESC")
        .all() as User[];
}

function fetchUsersWeeklyScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY weekly_score DESC")
        .all() as User[];
}

function fetchUsersMonthlyScore(): User[] {
    return db
        .prepare("SELECT * FROM users ORDER BY monthly_score DESC")
        .all() as User[];
}

function getUsersDailyScore(req: Request, res: Response) {
    try {
        const users = fetchUsersDailyScore();
        if (users.length === 0) {
            return res.status(404).send("Aucun utilisateur trouvé");
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error);
    }
}

function getUsersWeeklyScore(req: Request, res: Response) {
    try {
        const users = fetchUsersWeeklyScore();
        if (users.length === 0) {
            return res.status(404).send("Aucun utilisateur trouvé");
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error);
    }
}

function getUsersMonthlyScore(req: Request, res: Response) {
    try {
        const users = fetchUsersMonthlyScore();
        if (users.length === 0) {
            return res.status(404).send("Aucun utilisateur trouvé");
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { getUsersDailyScore, getUsersWeeklyScore, getUsersMonthlyScore };
