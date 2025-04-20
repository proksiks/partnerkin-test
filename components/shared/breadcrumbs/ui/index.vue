<template>
    <div class="breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">
        <span class="breadcrumbs__item" v-for="(link, index) in path" :key="index" itemscope itemprop="itemListElement"
            itemtype="http://schema.org/ListItem" :class="{ 'last-item': index == lastIndex }">
            <nuxt-link class="breadcrumbs__link" v-if="index < lastIndex" itemprop="item" :href="link.path">
                <span itemprop="name">{{ link.name }}</span>
            </nuxt-link>
            <span class="breadcrumbs__link" v-else itemprop="item">{{ link.name }}</span>
            <meta itemprop="position" :content="(index + 2).toString()" />
        </span>
    </div>
</template>


<script setup lang="ts">
import type { IBreadcrumb } from '~/components/shared/breadcrumbs/model'
const props = defineProps<{ path: IBreadcrumb[] }>()

const lastIndex = computed(() => {
    return props.path.length - 1
})
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>