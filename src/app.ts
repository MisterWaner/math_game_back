import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import methodOverride from "method-override";
import { initDb } from "./lib/data.js";
import "./lib/score-tasks.js";

import userRouter from "./routers/user-router.js";
import authRouter from "./routers/auth-router.js";

config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders:
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`Server démarré sur le port ${port}`);
    initDb();
});
