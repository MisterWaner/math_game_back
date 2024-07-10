import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, updateUserPassword, updateUserDailyScore } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.put("/:id/update-score", updateUserDailyScore);
userRouter.put("/:id/password", updateUserPassword);
userRouter.delete("/:id", deleteUser);

export default userRouter;