<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, watchEffect } from 'vue'
import site from '../config'

const { page } = useData()

type Breadcrumb = {
  name: string
  first: boolean
}

const items = ref<Breadcrumb[]>([])
watchEffect(() => {
  const filePath = page.value.filePath
  if (!filePath) {
    items.value = []
    return
  }

  const pathSegs = filePath.split('/')
  const shownSegs = pathSegs.at(-1) === 'index.md' ? pathSegs.slice(0, -2) : pathSegs.slice(0, -1)

  const pathMap = new Map(site.breadcrumbPathMap)
  items.value = shownSegs.map((item, index) => ({
    name: pathMap.get(item) ?? item.replaceAll('-', ' '),
    first: !index,
  }))
})
</script>

<template>
  <div id="breadcrumb">
    <a href="/">
      <Icon name="material-symbols:home-outline-rounded" />
    </a>
    <template v-for="(item, index) in items" :key="`${item.name}-${index}`">
      <Icon name="material-symbols:chevron-right-rounded" color="var(--vp-c-text-2)" />
      <span :id="item.first ? 'bc-project' : undefined" >{{ item.name }}</span>
    </template>
  </div>
</template>

<style scoped>
#breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
  color: var(--vp-c-brand-2);
}
</style>