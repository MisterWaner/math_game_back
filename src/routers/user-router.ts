import { Router } from "express";
import { getUsers, getUser, createUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);

export default userRouter;