import { db } from '~/server/database/config'

interface UpdateTaskStatus {
    status: string
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<UpdateTaskStatus>(event)
        const taskId = getRouterParam(event, 'id')

        await db.run('UPDATE tasks SET status = ? WHERE id = ?', [body.status, taskId])

        return { success: true }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Ошибка при обновлении статуса задачи'
        })
    }
})