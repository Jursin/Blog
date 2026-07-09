<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import { computed, ref, onMounted } from 'vue'
import { countWord } from '../utils/functions'
import site from '../config'

const { page } = useData()
const router = useRouter()
const route = router.route

const date = computed(() => new Date(page.value.lastUpdated!))

const wordCount = ref(0)
const imageCount = ref(0)

const category = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  return parts.length > 1 ? parts[1] : ''
})

const categoryDisplay = computed(() => {
  if (!category.value) return ''
  return site.categoryPathMap[category.value] || category.value.replaceAll('-', ' ')
})

const tags = computed(() => {
  return Array.isArray(page.value.frontmatter.tags) ? page.value.frontmatter.tags : []
})

const wordTime = computed(() => {
  return (wordCount.value / 275) * 60
})

const imageTime = computed(() => {
  const n = imageCount.value
  if (n <= 10) {
    return n * 13 + (n * (n - 1)) / 2
  }
  return 175 + (n - 10) * 3
})

const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60)
})

function navigateToCategory() {
  if (category.value) router.go(`/?category=${category.value}`)
}

function navigateToTag(tag: string) {
  router.go(`/?tag=${encodeURIComponent(tag)}`)
}

onMounted(() => {
  const container = document.querySelector('#VPContent')
  imageCount.value = container?.querySelectorAll('.content-container .main img').length || 0
  const text = container?.querySelector('.content-container .main')?.textContent || ''
  wordCount.value = countWord(text)
})
</script>

<template>
  <div class="article-meta">
    <div class="meta-info">
      <span class="meta-item">
        <Icon name="material-symbols:history" color="var(--vp-c-brand-1)" />
        {{ date.toLocaleDateString() }}
      </span>
      <span class="meta-item">
        <Icon name="material-symbols:article" color="var(--vp-c-brand-1)" />
        {{ wordCount }} 字
      </span>
      <span class="meta-item">
        <Icon name="mdi:clock-outline" color="var(--vp-c-brand-1)" />
        {{ readTime }} 分钟
      </span>
      <span class="meta-item meta-item-pageview">
        <Icon name="mdi:eye-outline" color="var(--vp-c-brand-1)" />
        <span class="waline-pageview-count" :data-path="route.path" />
      </span>
      <span
        v-if="category"
        class="meta-item meta-badge"
        @click="navigateToCategory"
      >
        <Icon name="material-symbols:folder-outline" color="var(--vp-c-brand-1)" />
        {{ categoryDisplay }}
      </span>
      <span
        v-for="tag in tags"
        :key="tag"
        class="meta-item meta-badge meta-badge--tag"
        @click="navigateToTag(tag)"
      >
        <Icon name="material-symbols:label-outline" color="var(--vp-c-brand-1)" />
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style>
.meta-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 15px;
  margin-top: 0.375rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

/* 分类/标签徽章 */
.meta-badge {
  padding: 0.05rem 0.45rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8125rem;
  white-space: nowrap;
}

.meta-badge:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-soft);
  background-color: var(--vp-c-brand-soft);
}
.meta-item-pageview {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.waline-pageview-count:empty::before {
  content: '加载中';
  color: var(--vp-c-text-2);
}
</style>
