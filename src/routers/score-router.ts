import { Router } from "express";

import { getUsersDailyScore, getUsersWeeklyScore, getUsersMonthlyScore } from "../controllers/scoresController.js";

const scoreRouter = Router();

scoreRouter.get("/daily-score", getUsersDailyScore);
scoreRouter.get("/weekly-score", getUsersWeeklyScore);
scoreRouter.get("/monthly-score", getUsersMonthlyScore);

export default scoreRouter;