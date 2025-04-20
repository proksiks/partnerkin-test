import { H3Event } from 'h3'

interface Task {
    id: number
    type: string
    title: string
    text: string
    payment: string
    time: string
}

export default defineEventHandler(async (event: H3Event) => {
    // В реальном приложении здесь будет запрос к базе данных
    // Сейчас возвращаем тестовые данные
    const activeTasks: Task[] = [
        {
            id: 1,
            type: 'Тестовое задание',
            title: 'Первое активное задание',
            text: 'Описание первого активного задания',
            payment: '1000 ₽',
            time: '2 часа'
        }
    ]

    return activeTasks
})