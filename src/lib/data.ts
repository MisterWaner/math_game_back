import sql from "better-sqlite3";

const db = new sql("mathgame.db");

export function initDb() {
    db.exec(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, age INTEGER, level TEXT, is_registered BOOLEAN DEFAULT false, daily_score INTEGER DEFAULT 0, weekly_score INTEGER DEFAULT 0, monthly_score INTEGER DEFAULT 0, global_score INTEGER DEFAULT 0);"
    );
    console.log("Base de données créée");
}
