<template>
    <div class="profile-page">
        <shared-breadcrumbs-ui :path="breadcrumbs" />
        <div class="profile-page__wrapper">
            <div class="profile-page__left-side">
                <user-ui class="profile-page__card" :user="user || defaultValue" />
            </div>
            <div class="profile-page__right-side">
                <div class="profile-page__head">
                    <h1 class="profile-page__title">Все задания</h1>
                    <form>
                        <shared-input-ui v-model="search" class="profile-page__search" :required="true" type="text"
                            placeholder="Поиск" />
                    </form>
                </div>
                <ul class="profile-page__tasks">
                    <li class="profile-page__task" v-for="task in filteredTasks" :key="task.id">
                        <task-ui :task="task" @click="openModal" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const search = ref('')
const route = useRoute()
const defaultValue = { id: 0, name: '', avatar: '', tag: '', socials: [] }
const { data: user } = await useFetch(`/api/users/${route.params.id}`)
const { data: tasks } = await useFetch(`/api/users/${route.params.id}/tasks`)

const filteredTasks = computed(() => {
    if (!tasks.value) return []
    if (!search.value) return tasks.value
    
    const searchLower = search.value.toLowerCase()
    return tasks.value.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.text.toLowerCase().includes(searchLower)
    )
})

const breadcrumbs = ref([
    { name: 'Все профили', path: '/' },
])

watchEffect(() => {
    if (user.value) {
        breadcrumbs.value = [
            { name: 'Все профили', path: '/' },
            { name: `Профиль ${user.value.tag}`, path: `/profile/${route.params.id}` },
        ]
    }
})

const { show } = storeToRefs(useFeedbackModal())

const openModal = () => {
    show.value = true
}

useHead({ 
    title: user.value ? `Профиль ${user.value.name}` : 'Профиль', 
    meta: [{ name: 'description', content: 'Профиль пользователя' }] 
})
</script>

<style lang="scss">
@use 'profile' as *;
</style>