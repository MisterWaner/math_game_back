import sql from "better-sqlite3";

const db = new sql("mathgame.db");

export function initDb() {
    db.exec(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, age INTEGER, level TEXT)"
    );
    console.log("Base de données créée");
}
