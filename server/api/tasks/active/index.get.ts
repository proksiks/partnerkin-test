import { db } from '~/server/database/config'

export default defineEventHandler(async () => {
    try {
        const tasks = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM tasks WHERE status = ?', ['active'], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        return tasks;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Ошибка при получении активных задач'
        });
    }
})