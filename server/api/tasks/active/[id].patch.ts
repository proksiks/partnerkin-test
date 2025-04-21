import { db } from '~/server/database/config'

interface UpdateTaskStatus {
    status: string
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<UpdateTaskStatus>(event)
        const taskId = getRouterParam(event, 'id')

        // Удаляем задачу при завершении
        await db.run('DELETE FROM tasks WHERE id = ?', [taskId])

        return { success: true }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Ошибка при обновлении статуса задачи'
        })
    }
})