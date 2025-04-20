<template>
    <div style="background-color: var(--bg_main); padding: 1.25rem;">
        <h1>Список профилей</h1>
        <ul style="display: flex; gap: 1.25rem; flex-wrap: wrap; list-style: none; padding: 1.25rem; margin: 0; background-color: var(--white); border-radius: 1rem;">
            <li v-for="user in users" :key="user.id">
                <nuxt-link style="border-radius: 0.5rem; display: block; text-decoration: none; background-color: var(--text); color: white; padding: 1.25rem;" :to="`/profile/${user.id}`">
                    {{ user.name }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const { data: users } = await useFetch('/api/users');
</script>