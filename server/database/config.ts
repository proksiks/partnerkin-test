import sqlite3 from 'sqlite3';
const { Database } = sqlite3;
import { join } from 'path';

const dbPath = join(process.cwd(), 'server/database/tasks.db');

export const db = new Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to SQLite database');

    // Create tasks table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS active_tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            price REAL NOT NULL,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});