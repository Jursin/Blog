<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Post } from '../posts.data'
import { formatDate } from '../utils/functions'

defineProps<{
  posts: Post[]
  date?: 'full' | 'short'
  showPinned?: boolean
}>()
</script>

<template>
  <ul class="lite-list">
    <li v-for="post in posts" :key="post.url">
      <a :href="withBase(post.url)" class="link-row">
        <span class="link-title">
          <span v-if="post.order && showPinned" class="link-pin">置顶</span>
          {{ post.title }}
        </span>
        <span class="link-date">
          {{ formatDate(post.createTime, date) }}
        </span>
      </a>
    </li>
    <li v-if="!posts.length" class="list-empty">暂无文章</li>
  </ul>
</template>

<style scoped>
.lite-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.link-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px;
  color: var(--vp-c-text-1);
  line-height: 1.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;
}

.link-row:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.link-row:hover .link-title::before {
  background-color: var(--vp-c-brand);
}

.link-pin {
  display: inline-block;
  margin-right: 0.5em;
  padding: 0.05em 0.45em;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  border-radius: 0.3125rem;
  vertical-align: middle;
}

.link-title::before {
  display: inline-block;
  content: '';
  margin: 0 10px 2px 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--vp-c-text-2);
  transition: background-color 0.2s;
}

.link-date {
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.list-empty {
  padding: 1rem 0;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .link-row {
    padding: 4px 0;
  }
}
</style>
