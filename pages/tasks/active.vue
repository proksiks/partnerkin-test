<template>
    <div class="active-tasks">
        <shared-breadcrumbs-ui :path="breadcrumbs" />
        <h1 class="active-tasks__title">Активные задания</h1>
        <ul class="active-tasks__list" v-if="tasks?.length">
            <li class="active-tasks__item" v-for="task in tasks" :key="task.id">
                <div class="active-tasks__box">
                    <div class="active-tasks__title">{{ task.title }}</div>
                    <div class="active-tasks__status">{{ task.status }}</div>
                    <div class="active-tasks__contact">
                        <p>Email: {{ task.email }}</p>
                        <p>Telegram: {{ task.telegram }}</p>
                        <p>Телефон: {{ task.phone }}</p>
                    </div>
                    <div class="active-tasks__message">
                        <p>{{ task.message }}</p>
                        <p v-if="task.do_not_call" class="active-tasks__no-call">Не звонить</p>
                    </div>
                    <div class="active-tasks__actions">
                        <shared-button-ui @click="completeTask(task.id)">Завершить</shared-button-ui>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else>У вас пока нет активных заданий</p>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: tasks, refresh: refreshTasks } = await useFetch('/api/tasks/active')

const completeTask = async (taskId: number) => {
    try {
        await $fetch(`/api/tasks/active/${taskId}`, {
            method: 'PATCH',
            body: { status: 'completed' }
        })
        await refreshTasks()
    } catch (error) {
        console.error('Ошибка при завершении задачи:', error)
    }
}

const breadcrumbs = [
    { name: 'Все профили', path: '/' },
    { name: 'Активные задания', path: '/tasks/active' },
]

useHead({
    title: 'Активные задания',
    meta: [{ name: 'description', content: 'Список активных заданий' }]
})
</script>

<style lang="scss" scoped>
.active-tasks {
    background-color: var(--bg_main);
    padding: 20px;

    &__title {
        margin: 20px 0;
        font-size: 24px;
        font-weight: bold;
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__item {
        background-color: var(--white);
        border-radius: 8px;
        padding: 16px;
    }

    &__box {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__status {
        color: var(--tag_gray_body);
        font-size: 14px;
    }

    &__contact {
        font-size: 14px;
        p {
            margin: 4px 0;
        }
    }

    &__message {
        font-size: 14px;
        color: var(--tag_gray_body);
    }

    &__no-call {
        color: var(--red);
        margin-top: 8px;
    }

    &__actions {
        margin-top: auto;
    }
}
</style>