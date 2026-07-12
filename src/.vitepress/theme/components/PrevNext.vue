<template>
  <nav v-if="prev || next" class="prev-next" aria-labelledby="doc-footer-aria-label">
    <span class="visually-hidden" id="doc-footer-aria-label">Pager</span>
    <div class="pager">
      <a
        v-if="prev"
        :href="withBase(prev.url)"
        class="pager-link prev"
      >
        <span class="desc">{{ theme.docFooter?.prev || '上一页' }}</span>
        <span class="title">{{ prev.title }}</span>
      </a>
    </div>
    <div class="pager">
      <a
        v-if="next"
        :href="withBase(next.url)"
        class="pager-link next"
      >
        <span class="desc">{{ theme.docFooter?.next || '下一页' }}</span>
        <span class="title">{{ next.title }}</span>
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData, withBase } from 'vitepress'
import { data as posts } from '../posts.data'

const route = useRoute()
const { theme } = useData()

function normalizePath(p: string): string {
  return p.replace(/\.html$/, '').replace(/\/$/, '')
}

const postIndexMap = computed(() => {
  const map = new Map<string, number>()
  posts.forEach((p, i) => map.set(normalizePath(p.url), i))
  return map
})

const currentPath = computed(() => normalizePath(route.path))

const currentIndex = computed(() => {
  return postIndexMap.value.get(currentPath.value) ?? -1
})

const prev = computed(() => {
  if (currentIndex.value <= 0) return null
  return posts[currentIndex.value - 1]
})

const next = computed(() => {
  if (currentIndex.value < 0 || currentIndex.value >= posts.length - 1) return null
  return posts[currentIndex.value + 1]
})
</script>

<style scoped>
.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  margin-top: 64px;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  text-decoration: none;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.25s;
}

.pager-link:hover .title {
  color: var(--vp-c-brand-2);
}
</style>
