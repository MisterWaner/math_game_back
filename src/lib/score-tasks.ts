import cron from 'node-cron'
import { fetchUsers } from "../controllers/userController.js";
import sql from "better-sqlite3";

const db = new sql("mathgame.db");

// Réinitialiser les scores journaliers tous les jours à minuit
cron.schedule('0 0 * * *', () => {
    const users = fetchUsers();
    for (const user of users) {
        db.prepare("UPDATE users SET weekly_score = weekly_score + daily_score, daily_score = 0 WHERE id = ?").run(user.id);
    }

    console.log("Scores journaliers réinitialisés");
});

// Réinitialiser les scores hebdomadaires tous les lundis à minuit
cron.schedule('0 0 * * 0', () => {
    const users = fetchUsers();
    for (const user of users) {
        db.prepare("UPDATE users SET monthly_score = monthly_score + weekly_score, weekly_score = 0 WHERE id = ?").run(user.id);
    }
    console.log("Scores hebdomadaires réinitialisés");
})

// Réinitialiser les scores mensuels tous les 1ers jours de chaque mois à minuit
cron.schedule('0 0 1 * *', () => {
    const users = fetchUsers();
    for (const user of users) {
        db.prepare("UPDATE users SET monthly_score = 0 WHERE id = ?").run(user.id);
    }
    console.log("Scores mensuels réinitialisés");
})



