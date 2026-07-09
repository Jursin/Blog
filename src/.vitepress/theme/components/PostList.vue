<template>
  <div class="post-list">
    <div
      v-for="post in posts"
      :key="post.url"
      class="post-item"
      :class="{ 'has-cover': post.cover }"
    >
      <div v-if="post.cover" class="post-item__cover-wrap">
        <img
          :src="withBase(post.cover)"
          :alt="post.title"
          class="post-item__cover"
          loading="lazy"
        />
      </div>

      <div class="post-item__body">
        <h2 class="post-item__title">
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </h2>

        <p v-if="post.excerpt" class="post-item__excerpt">
          {{ post.excerpt }}
        </p>

        <div class="post-item__footer">
          <div class="post-item__meta">
            <Icon name="material-symbols:calendar-today-outline" color="var(--vp-c-brand-1)" />
            {{ post.createTime ? post.createTime.split(' ')[0] : '' }}
            <template v-if="post.updateTime">
              <Icon name="material-symbols:history" color="var(--vp-c-brand-1)" />
              {{ post.updateTime }}
            </template>
          </div>

          <div class="post-item__badges">
            <span
              v-if="post.category"
              class="post-item__badge"
              @click.stop="$emit('selectCategory', post.category)"
            >
              <Icon name="material-symbols:folder-outline" color="var(--vp-c-brand-1)" />
              {{ post.categoryDisplay }}
            </span>
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="post-item__badge post-item__badge--tag"
              @click.stop="$emit('selectTag', tag)"
            >
              <Icon name="material-symbols:label-outline" color="var(--vp-c-brand-1)" />
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!posts.length" class="post-list__empty">
      暂无文章
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Post } from '../posts.data'

defineProps<{
  posts: Post[]
}>()

defineEmits<{
  selectCategory: [cat: string]
  selectTag: [tag: string]
}>()

</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-list__empty {
  padding: 3rem 0;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
}

.post-item {
  background-color: var(--vp-c-bg);
  color: inherit;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.2s ease;
}

.post-item:hover {
  border-color: var(--vp-c-brand-soft);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
}

/* === 有封面时的两栏布局 === */
.post-item.has-cover {
  display: flex;
  flex-direction: row-reverse;
  gap: 1.25rem;
  align-items: flex-start;
}

.post-item__cover-wrap {
  flex-shrink: 0;
  width: 200px;
  height: auto;
  aspect-ratio: 4 / 3;
  border-radius: 0.5rem;
  overflow: hidden;
}

.post-item__cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.2s ease;
}

.post-item.has-cover:hover .post-item__cover {
  transform: scale(1.03);
}

.post-item__body {
  flex: 1;
  min-width: 0;
}

/* === 标题 === */
.post-item__title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 0.625rem;
}

.post-item__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-item__title a:hover {
  color: var(--vp-c-brand);
}

.post-item__excerpt {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-item__footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.75rem;
}

.post-item__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.post-item__meta :deep(.icon) {
  font-size: 1rem;
}

.post-item__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.post-item__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.15rem 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9999px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.post-item__badge:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-soft);
  background-color: var(--vp-c-brand-soft);
}

.post-item__badge :deep(.icon) {
  font-size: 0.8125rem;
}

.post-item__badge--tag {
  border-color: var(--vp-c-divider);
}

/* === 响应式 === */
@media (max-width: 768px) {
  .post-list {
    gap: 0.75rem;
  }

  .post-item {
    padding: 1rem;
  }

  .post-item.has-cover {
    flex-direction: column;
  }

  .post-item__cover-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: unset;
  }

  .post-item__cover {
    width: 100%;
    height: auto;
    object-fit: initial;
  }

  .post-item__title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .post-item__excerpt {
    font-size: 0.8125rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .post-item__footer {
    gap: 0.5rem;
  }
}
</style>
