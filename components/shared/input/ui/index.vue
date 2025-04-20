<template>
    <label class="input" :class="[parentClass, { 'error': $attrs.isError }]">
        <span class="input-placeholder">
            {{ $attrs.placeholder }}
            <span class="input-required">
                {{ $attrs.required ? '*' : '' }}
            </span>
        </span>
        <input class="input-field" v-bind="$attrs" @input="setValue">
        <span class="input-error" :class="{ 'input-error_active': $attrs.isError }">{{ $attrs.errorText }}</span>
    </label>
</template>

<script lang="ts" setup>
const model = defineModel()
defineOptions({ inheritAttrs: false })
const setValue = (e: Event) => {
    model.value = (e.target as HTMLInputElement).value
}

defineProps<{ parentClass?: string }>()
</script>

<style lang="scss">
@use "index.scss" as *;
</style>