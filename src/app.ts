import express, { Request, Response } from "express";
import { config } from "dotenv";
import { initDb } from "./lib/data.js";

import userRouter from "./routers/user-router.js";

config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});

app.use("/users" , userRouter);

app.listen(port, () => {
    console.log(`Server démarré sur le port ${port}`);
    initDb();
})