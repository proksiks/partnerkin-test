<template>
    <div class="profile-page">
        <shared-breadcrumbs-ui :path="breadcrumbs" />
        <div class="profile-page__wrapper">
            <div class="profile-page__left-side">
                <user-ui class="profile-page__card" :user="user" />
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
                    <li class="profile-page__task" v-for="item in 10" :key="item">
                        <task-ui :task="task" @click="test" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const search = ref('')

const route = useRoute()

const task = reactive({
    id: 1,
    type: 'Дизайн',
    title: 'Сделать креативы для ВК',
    text: 'Сделать креативы в ВК, дешево, под арбитражную тематику Портфолио - обязательно Сделать креативы в ВК, дешево, под арбитражную тематику Портфолио - обязательно Сделать креативы в ВК, дешево, под арбитражную тематику Портфолио - обязательно',
    time: '5 дней',
    payment: '500 руб',
})

const user = reactive({
    id: 1,
    name: 'Титова Елена Николаевна',
    avatar: '/images/profile/photo/photo.jpg',
    tag: 'username',
    socials: [
        { name: 'vkontakte', link: '#' },
        { name: 'instagram', link: '#' },
        { name: 'facebook', link: '#' },
        { name: 'twitter', link: '#' },
    ],
})

const breadcrumbs = ref([
    { name: 'Все задания', path: '/' },
])

breadcrumbs.value.push({
    name: `Профиль ${user.tag}`,
    path: `/profile/${route.params.id}`,
})

useHead({ title: 'Профиль', meta: [{ name: 'description', content: 'Профиль' }] })

const test = () => {
    console.log('test')
}
</script>

<style lang="scss">
@use 'profile' as *;
</style>