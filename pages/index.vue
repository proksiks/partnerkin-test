<template>
    <div style="background-color: var(--bg_main);  padding: 1.25rem;">
        <h1>Заготовка для главой</h1>
        <ul
            style="display: flex; gap: 1.25rem; flex-wrap: wrap; list-style: none; padding: 1.25rem; margin: 0; background-color: var(--white); border-radius: 1rem;">
            <li v-for="item in 10" :key="item">
                <nuxt-link style="border-radius: 0.5rem; display: block; text-decoration: none; background-color: var(--text); color: white; 
                padding: 1.25rem;" :to="`/profile/${item}`">Профили {{ item }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>