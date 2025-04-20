import { db } from '../../database/config';

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM active_tasks WHERE status = "active"', (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    if (event.method === 'POST') {
        const body = await readBody(event);
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO active_tasks (title, price, status) VALUES (?, ?, ?)',
                [body.title, body.price, 'active'],
                function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ id: this.lastID });
                }
            );
        });
    }

    if (event.method === 'PUT') {
        const body = await readBody(event);
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE active_tasks SET status = ? WHERE id = ?',
                ['completed', body.id],
                (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ success: true });
                }
            );
        });
    }
});