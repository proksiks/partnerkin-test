<template>
    <div class="task">
        <p class="task__type">
            {{ task.type }}
        </p>
        <h2 class="task__title">
            {{ task.title }}
        </h2>
        <p class="task__text">
            {{ task.text }}
        </p>
        <div class="task__footer">
            <div class="task__info">
                <div class="task__payment">
                    {{ task.payment }}
                </div>
                <div class="task__time">
                    {{ task.time }}
                </div>
            </div>
            <shared-button-ui class="task__button" @click="show = true">Взять задачу</shared-button-ui>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITask } from '~/components/task/model'
defineProps<{ task: ITask }>()

const { show } = storeToRefs(useFeedbackModal())

useHead({
    // htmlAttrs: {
    //     class: show ? 'overflow-hidden' : '',
    // }
})
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>