<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import type { GroupData } from '../utils/group'
import siteConfig from '../config'
import { getCategoryDisplay } from '../utils/functions'
import ChargeCard from './ChargeCard.vue'

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

<template>
  <aside class="info-panel">
    <!-- 个人资料 -->
    <div class="info-card profile-card">
      <img
        :src="withBase(siteLogo)"
        :alt="siteTitle"
        class="user-avatar"
      />
      <div class="user-name">{{ siteTitle }}</div>
      <div class="user-state">
        <span class="state-dot"></span>
        持续学习中
      </div>
      <div class="social-links">
        <a
          v-for="item in socialLinkItems"
          :key="item.url"
          :href="item.url"
          target="_blank"
          class="social-link"
          :title="item.label"
        >
          <Icon :name="item.icon" :size="item.size" :color="item.color" />
        </a>
      </div>
    </div>

    <!-- 发电赞助 -->
    <ChargeCard url="https://ifdian.net/a/jursin" />

    <!-- 网站数据 -->
    <div class="info-card stat-card">
      <div class="stat-item">
        <span class="stat-val">{{ totalPosts }}</span>
        <span class="stat-lbl">文章总数</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">{{ runningDays }}</span>
        <span class="stat-lbl">运行天数</span>
      </div>
    </div>

    <!-- 分类 -->
    <div class="info-card" v-if="tabs.category.length">
      <h3 class="sec-title">
        <Icon name="mdi:folder-outline" color="var(--vp-c-brand-1)" size="1.15em" />
        分类
        <span class="title-badge">{{ tabs.category.length }}</span>
      </h3>
      <div class="tag-list">
        <span
          v-for="cat in tabs.category"
          :key="cat"
          class="tag-item"
          :class="{ 'tag-active': selectedCategory === cat }"
          @click="toggleCategory(cat)"
        >
          {{ getCategoryDisplay(cat) }}
          <span class="tag-num">{{ postsByCategory[cat]?.length || 0 }}</span>
        </span>
      </div>
    </div>

    <!-- 标签 -->
    <div class="info-card" v-if="tabs.tag.length">
      <h3 class="sec-title">
        <Icon name="mdi:tag-outline" color="var(--vp-c-brand-1)" />
        标签
        <span class="title-badge">{{ tabs.tag.length }}</span>
      </h3>
      <div class="tag-list">
        <span
          v-for="tag in tabs.tag"
          :key="tag"
          class="tag-item"
          :class="{ 'tag-active': selectedTag === tag }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
          <span class="tag-num">{{ postsByTag[tag]?.length || 0 }}</span>
        </span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.info-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.profile-card {
  text-align: center;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 0.75rem;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.375rem;
}

.user-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.state-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
  display: inline-block;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  max-width: 95%;
  margin: 0 auto;
}

.social-link {
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

.social-link:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
}

.social-link :deep(.icon) {
  font-size: 1.25rem;
}

.stat-card {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-val {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.stat-lbl {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.sec-title {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem;
}

.sec-title :deep(.icon) {
  font-size: 1.125rem;
}

.title-badge {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-alt);
  padding: 0.1rem 0.45rem;
  border-radius: 50%;
  line-height: 1.4;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
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

.tag-item:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-soft);
}

.tag-active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.tag-num {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.tag-active .tag-num {
  color: var(--vp-c-brand);
}

@media (max-width: 1024px) {
  .info-panel {
    gap: 1rem;
  }

  .info-card {
    padding: 1rem;
  }
}
</style>
