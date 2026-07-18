<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Post } from '../posts.data'
import { formatDate } from '../utils/functions'

defineProps<{
  posts: Post[]
}>()

defineEmits<{
  selectCategory: [cat: string]
  selectTag: [tag: string]
}>()

</script>

<template>
  <div class="post-list">
    <div
      v-for="post in posts"
      :key="post.url"
      class="post-item"
      :class="{ 'has-cover': post.cover }"
    >
      <div v-if="post.cover" class="cover-wrap">
        <img
          :src="withBase(post.cover)"
          :alt="post.title"
          class="cover-img"
          loading="lazy"
        />
      </div>

      <div class="post-body">
        <h2 class="post-title">
          <span v-if="post.order" class="post-pin">置顶</span>
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </h2>

        <p v-if="post.excerpt" class="excerpt">
          {{ post.excerpt }}
        </p>

        <div class="post-foot">
          <div class="post-meta">
            <Icon name="material-symbols:calendar-today-outline" color="var(--vp-c-brand-1)" />
            {{ formatDate(post.createTime) }}
            <template v-if="post.updateTime">
              <Icon name="material-symbols:history" color="var(--vp-c-brand-1)" />
              {{ post.updateTime }}
            </template>
          </div>

          <div class="badge-list">
            <span
              v-if="post.category"
              class="badge-item"
              @click.stop="$emit('selectCategory', post.category)"
            >
              <Icon name="mdi:folder-outline" color="var(--vp-c-brand-1)" size="1.25em" />
              {{ post.categoryDisplay }}
            </span>
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="badge-item badge-alt"
              @click.stop="$emit('selectTag', tag)"
            >
              <Icon name="mdi:tag-outline" color="var(--vp-c-brand-1)" size="1.1em" />
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!posts.length" class="list-empty">
      暂无文章
    </div>
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-empty {
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

.post-item.has-cover {
  display: flex;
  flex-direction: row-reverse;
  gap: 1.25rem;
  align-items: flex-start;
}

.cover-wrap {
  flex-shrink: 0;
  width: 200px;
  height: auto;
  aspect-ratio: 4 / 3;
  border-radius: 0.5rem;
  overflow: hidden;
}

.cover-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.2s ease;
}

.post-item.has-cover:hover .cover-img {
  transform: scale(1.03);
}

.post-body {
  flex: 1;
  min-width: 0;
}

.post-title {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 0.625rem;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-pin {
  display: inline-block;
  margin-right: 0.5em;
  padding: 0.1em 0.5em;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-2);
  border-radius: 0.375rem;
  vertical-align: middle;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.excerpt {
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

.post-foot {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.75rem;
}

.post-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.post-meta :deep(.icon) {
  font-size: 1rem;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.badge-item {
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

.badge-item:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-soft);
  background-color: var(--vp-c-brand-soft);
}

.badge-item :deep(.icon) {
  font-size: 0.8125rem;
}

.badge-item.badge-alt {
  border-color: var(--vp-c-divider);
}

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

  .cover-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: unset;
  }

  .cover-img {
    width: 100%;
    height: auto;
    object-fit: initial;
  }

  .post-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .excerpt {
    font-size: 0.8125rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .post-foot {
    gap: 0.5rem;
  }
}
</style>
