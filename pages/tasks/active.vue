<template>
    <div class="active-tasks">
        <shared-breadcrumbs-ui :path="breadcrumbs" />
        <h1 class="active-tasks__title">Активные задания</h1>
        <ul class="active-tasks__list" v-if="tasks?.length">
            <li v-for="task in tasks" :key="task.id">
                <task-ui :task="task" />
            </li>
        </ul>
        <p v-else>У вас пока нет активных заданий</p>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: tasks } = await useFetch('/api/tasks/active')

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

        li {
            background-color: var(--white);
        }
    }
}
</style>