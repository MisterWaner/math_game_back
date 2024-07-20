import { Router } from "express";
import {
    getUsers,
    getUser,
    createRegisteredUser,
    createInvitedUser,
    updateUser,
    deleteUser,
    deleteInvitedUser,
    updateUserPassword,
    updateUserDailyScore,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createRegisteredUser);
userRouter.post("/invited", createInvitedUser);
userRouter.put("/:id", updateUser);
userRouter.put("/:username/update-score", updateUserDailyScore);
userRouter.put("/:id/password", updateUserPassword);
userRouter.delete("/:id", deleteUser);
userRouter.delete("/invited/:username", deleteInvitedUser);

export default userRouter;
