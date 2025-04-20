<template>
    <div class="user-card">
        <div class="user-card__photo">
            <img class="user-card__image" width="280" height="280" :src="user.avatar" alt="avatar">
        </div>
        <div class="user-card__content">
            <div class="user-card__name">
                {{ user.name }}
            </div>
            <div class="user-card__tag">
                <icon class="user-card__tag-icon" name="icon:person" />
                <span class="user-card__tag-text">{{ user.tag }}</span>
            </div>
            <ul class="user-card__socials" v-if="user.socials">
                <li class="user-card__socials-item" v-for="social in user.socials">
                    <a :href="social.link" class="user-card__social">
                        <icon class="user-card__social-icon" :name="`icon:${social.name}`" />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IUser } from '~/components/user/model'
defineProps<{ user: IUser }>()
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>