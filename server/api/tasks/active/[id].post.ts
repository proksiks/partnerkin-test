import { randomNumber } from '~/server/utils/randomIntFromInterval'

interface FeedbackForm {
    tel: string
    email: string
    telegram: string
    checkbox: boolean
    message: string
    taskId?: number
}

const validateForm = (form: FeedbackForm) => {
    if (!form.telegram?.trim()) {
        throw createError({
            statusCode: 400,
            message: 'Telegram обязателен'
        })
    }

    if (!form.email?.trim()) {
        throw createError({
            statusCode: 400,
            message: 'Email обязателен'
        })
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        throw createError({
            statusCode: 400,
            message: 'Некорректный email'
        })
    }
}

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody<FeedbackForm>(event)
    const taskId = Number(event.context.params?.id)
    
    if (isNaN(taskId)) {
        throw createError({
            statusCode: 400,
            message: 'Некорректный ID задачи'
        })
    }

    // В реальном приложении здесь будет сохранение в базу данных
    // Сейчас просто возвращаем успешный результат
    return {
        success: true,
        message: 'Заявка успешно отправлена'
    }
})