<template>
    <transition name="fade" mode="out-in">
        <div class="modal" v-if="model">
            <div class="modal__wrapper">
                <h1 class="modal__title">{{ title }}</h1>
                <forms-feedback-ui />
                <button class="modal__close" @click="model = false">X</button>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
const model = defineModel({
    type: Boolean,
    default: false
})

defineProps<{ title: string }>()
</script>

<style lang="scss" scoped>
@use "index" as *;
</style>