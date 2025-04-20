import { db } from '~/server/database/config'

interface FeedbackForm {
    tel: string
    email: string
    telegram: string
    checkbox: boolean
    message: string
    taskId?: number
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<FeedbackForm>(event)
        const taskId = getRouterParam(event, 'id')

        // Проверяем, существует ли уже задача с таким ID
        const existingTask = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM tasks WHERE id = ?', [taskId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (existingTask) {
            throw createError({
                statusCode: 400,
                message: 'Задача с таким ID уже существует'
            });
        }

        if (!body.telegram?.trim()) {
            throw createError({
                statusCode: 400,
                message: 'Telegram обязателен'
            })
        }

        if (!body.email?.trim()) {
            throw createError({
                statusCode: 400,
                message: 'Email обязателен'
            })
        }

        if (!/^\S+@\S+\.\S+$/.test(body.email)) {
            throw createError({
                statusCode: 400,
                message: 'Некорректный email'
            })
        }

        // Создаем таблицу tasks, если она не существует
        await new Promise((resolve, reject) => {
            db.run(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY,
                    title TEXT NOT NULL,
                    status TEXT DEFAULT 'active',
                    email TEXT,
                    telegram TEXT,
                    phone TEXT,
                    message TEXT,
                    do_not_call INTEGER DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) reject(err);
                else resolve(null);
            });
        });

        // Создаем новую задачу в базе данных
        await new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO tasks (id, title, status, email, telegram, phone, message, do_not_call)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                taskId,
                'Новая задача',
                'active',
                body.email,
                body.telegram,
                body.tel,
                body.message,
                body.checkbox ? 1 : 0
            ], (err) => {
                if (err) reject(err);
                else resolve(null);
            });
        });

        return {
            success: true,
            message: 'Заявка успешно отправлена'
        }
    } catch (error) {
        console.error('Error creating task:', error);
        if (error.code === 'SQLITE_CONSTRAINT') {
            throw createError({
                statusCode: 400,
                message: 'Задача с таким ID уже существует'
            });
        }
        throw createError({
            statusCode: 500,
            message: 'Ошибка при создании задачи: ' + (error.message || '')
        })
    }
})