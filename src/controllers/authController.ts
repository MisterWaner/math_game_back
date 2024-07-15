import { Request, Response } from "express";
import { authenticate, generateToken } from "../lib/helpers.js";
import { User } from "../models/user.js";

async function login(req: Request, res: Response) {
    try {
        const { username, password }: User = req.body;
        if (!username || !password) {
            return res.status(400).json("pseudo ou mot de passe manquant");
        }

        const user = await authenticate(username, password);
        if (!user) {
            return res.status(401).json("Mot de passe ou pseudo incorrect");
        }

        const token = await generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000,
        });
        res.status(200).json({
            token: token,
            message: "Authentification réussie",
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la connexion",
            error,
        });
    }
}

async function logout(req: Request, res: Response) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        });
        return res.status(200).json("Déconnexion réussie");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la déconnexion",
            error,
        });
    }
}

export { login, logout };
