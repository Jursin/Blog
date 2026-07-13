<template>
  <aside class="home-sidebar">
    <!-- Profile -->
    <div class="home-sidebar__section home-sidebar__profile">
      <img
        :src="withBase(siteLogo)"
        :alt="siteTitle"
        class="home-sidebar__avatar"
      />
      <div class="home-sidebar__name">{{ siteTitle }}</div>
      <div class="home-sidebar__status">
        <span class="home-sidebar__status-dot"></span>
        持续学习中
      </div>
      <div class="home-sidebar__links">
        <a
          v-for="item in socialLinkItems"
          :key="item.url"
          :href="item.url"
          target="_blank"
          class="home-sidebar__link"
          :title="item.label"
        >
          <Icon :name="item.icon" :size="item.size" :color="item.color" />
        </a>
      </div>
    </div>

    <!-- Stats -->
    <div class="home-sidebar__section home-sidebar__stats">
      <div class="home-sidebar__stat">
        <span class="home-sidebar__stat-value">{{ totalPosts }}</span>
        <span class="home-sidebar__stat-label">文章总数</span>
      </div>
      <div class="home-sidebar__stat">
        <span class="home-sidebar__stat-value">{{ runningDays }}</span>
        <span class="home-sidebar__stat-label">运行天数</span>
      </div>
    </div>

    <!-- Categories -->
    <div class="home-sidebar__section" v-if="tabs.category.length">
      <h3 class="home-sidebar__title">
        <Icon name="material-symbols:folder-outline" color="var(--vp-c-brand-1)" />
        分类
        <span class="home-sidebar__title-count">{{ tabs.category.length }}</span>
      </h3>
      <div class="home-sidebar__tags">
        <span
          v-for="cat in tabs.category"
          :key="cat"
          class="home-sidebar__tag"
          :class="{ 'home-sidebar__tag--active': selectedCategory === cat }"
          @click="toggleCategory(cat)"
        >
          {{ getCategoryDisplay(cat) }}
          <span class="home-sidebar__tag-count">{{ postsByCategory[cat]?.length || 0 }}</span>
        </span>
      </div>
    </div>

    <!-- Tags -->
    <div class="home-sidebar__section" v-if="tabs.tag.length">
      <h3 class="home-sidebar__title">
        <Icon name="material-symbols:label-outline" color="var(--vp-c-brand-1)" />
        标签
        <span class="home-sidebar__title-count">{{ tabs.tag.length }}</span>
      </h3>
      <div class="home-sidebar__tags home-sidebar__tags--tagcloud">
        <span
          v-for="tag in tabs.tag"
          :key="tag"
          class="home-sidebar__tag"
          :class="{ 'home-sidebar__tag--active': selectedTag === tag }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
          <span class="home-sidebar__tag-count">{{ postsByTag[tag]?.length || 0 }}</span>
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import type { GroupData } from '../utils/group'
import siteConfig from '../config'
import { getCategoryDisplay } from '../utils/functions'

const { theme, site } = useData()

const props = defineProps<{
  totalPosts: number
  runningDays: number
  tabs: { category: string[]; tag: string[] }
  postsByCategory: GroupData
  postsByTag: GroupData
  selectedCategory: string
  selectedTag: string
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:selectedTag': [value: string]
}>()

const siteTitle = site.value.title || 'Blog'
const siteLogo = (theme.value as any)?.logo || '/avatar.png'
const socialLinkItems = siteConfig.socialLinks

const toggleCategory = (cat: string) => {
  emit('update:selectedCategory', props.selectedCategory === cat ? '' : cat)
}

const toggleTag = (tag: string) => {
  emit('update:selectedTag', props.selectedTag === tag ? '' : tag)
}
</script>

<style scoped>
.home-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.home-sidebar__section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.home-sidebar__profile {
  text-align: center;
}

.home-sidebar__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 0.75rem;
}

.home-sidebar__name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.375rem;
}

.home-sidebar__status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.home-sidebar__status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
  display: inline-block;
}

.home-sidebar__links {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  max-width: 95%;
  margin: 0 auto;
}

.home-sidebar__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-alt);
  text-decoration: none;
  transition: all 0.2s;
}

.home-sidebar__link:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
}

.home-sidebar__link :deep(.icon) {
  font-size: 1.25rem;
}

/* Stats */
.home-sidebar__stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.home-sidebar__stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.home-sidebar__stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.home-sidebar__stat-label {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

/* Section title */
.home-sidebar__title {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem;
}

.home-sidebar__title :deep(.icon) {
  font-size: 1.125rem;
}

.home-sidebar__title-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-alt);
  padding: 0.1rem 0.45rem;
  border-radius: 50%;
  line-height: 1.4;
}

/* Tags / Categories */
.home-sidebar__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.home-sidebar__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.4;
}

.home-sidebar__tag:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-soft);
}

.home-sidebar__tag--active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.home-sidebar__tag-count {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.home-sidebar__tag--active .home-sidebar__tag-count {
  color: var(--vp-c-brand);
}

@media (max-width: 1024px) {
  .home-sidebar {
    gap: 1rem;
  }

  .home-sidebar__section {
    padding: 1rem;
  }
}
</style>
