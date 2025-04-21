import { db } from './config'

export const createTables = () => {
    // Create tasks table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            email TEXT NOT NULL,
            telegram TEXT NOT NULL,
            phone TEXT,
            message TEXT,
            do_not_call BOOLEAN DEFAULT 0,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating tasks table:', err)
            return
        }
        console.log('Tasks table created successfully')
    })
}

// Run migrations
createTables()