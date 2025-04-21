<template>
    <transition name="fade" mode="out-in">
        <div class="modal" v-if="model">
            <div class="modal__wrapper" ref="content">
                <h1 class="modal__title">{{ title }}</h1>
                <forms-feedback-ui />
                <button class="modal__close" @click="model = false">
                    <icon class="modal__close-icon" name="icon:cross" />
                </button>
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
const content = shallowRef<HTMLElement | null>(null)

onClickOutside(content, () => {
    model.value = false
})

onKeyStroke(['Escape'], (e) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        model.value = false
    }
})
</script>

<style lang="scss" scoped>
@use "index" as *;
</style>