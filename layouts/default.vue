<template>
    <main class="main">
        <slot />
        <modals-feedback-ui v-model="show" title="Информация по отклику" />
    </main>
</template>

<script setup lang="ts">
const { show } = storeToRefs(useFeedbackModal());
</script>

<style lang="scss">
.main {
    height: 100%;
    display: flex;
    flex-direction: column;

    > * {
        flex: 1;
    }
}
</style>