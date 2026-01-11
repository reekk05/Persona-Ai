import Database from "better-sqlite3";

const db = new Database("database.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE, 
    password TEXT
    );
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    chat_id INTEGER,
    role TEXT,
    type TEXT, 
    content TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`)

export default db