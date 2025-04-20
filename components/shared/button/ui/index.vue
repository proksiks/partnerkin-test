<template>
    <nuxt-link class="button" to="#" v-if="to && !target">
        <slot />
    </nuxt-link>
    <a class="button" :href="to" :target="target" v-else-if="to && target === '_blank'">
        <slot />
    </a>
    <button class="button" v-else>
        <slot />
    </button>
</template>

<script setup lang="ts">
import type { IButton } from '~/components/shared/button/model';
defineProps<IButton>();
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>