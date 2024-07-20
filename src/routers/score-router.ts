import { Router } from "express";

import { getUsersDailyScore, getUsersWeeklyScore, getUsersMonthlyScore, getTop5Scores } from "../controllers/scoresController.js";

const scoreRouter = Router();

scoreRouter.get("/daily-score", getUsersDailyScore);
scoreRouter.get("/weekly-score", getUsersWeeklyScore);
scoreRouter.get("/monthly-score", getUsersMonthlyScore);
scoreRouter.get("/top-five", getTop5Scores);

export default scoreRouter;