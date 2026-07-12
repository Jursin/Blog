<template>
  <div class="archives-page" v-if="posts.length">
    <div class="archives-page__sidebar">
      <HomeSidebar
        :totalPosts="posts.length"
        :runningDays="runningDays"
        :tabs="tabs"
        :postsByCategory="groupedPosts.category"
        :postsByTag="groupedPosts.tag"
        :selectedCategory="''"
        :selectedTag="''"
        @update:selectedCategory="onCategoryChange"
        @update:selectedTag="onTagChange"
      />
    </div>
    <div class="archives-page__content">
      <template v-if="tabs.archive.length">
        <template v-for="year in tabs.archive" :key="year">
          <h2 class="archives__year">{{ year }}</h2>
          <PostListLite :posts="groupedPosts.archive[year]" date="full" :showPinned="false" />
        </template>
      </template>
      <div v-else class="archives__empty">暂无文章</div>
    </div>
  </div>
  <div v-else class="archives-page archives-page--empty">
    <p>暂无文章</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress'
import { data as posts } from '../../posts.data'
import { useGroup } from '../../utils/group'
import site from '../../config'
import { countDaysFrom } from '../../utils/functions'
import HomeSidebar from '../HomeSidebar.vue'
import PostListLite from '../PostListLite.vue'

const router = useRouter()
const runningDays = countDaysFrom(site.blogStartDate)

const { tabs, posts: groupedPosts } = useGroup(posts)

// 点击分类/标签跳转到首页并附带筛选
const onCategoryChange = (cat: string) => {
  router.go(`/?category=${cat}`)
}

const onTagChange = (tag: string) => {
  router.go(`/?tag=${encodeURIComponent(tag)}`)
}
</script>

<style scoped>
.archives-page {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  max-width: 1420px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.archives-page--empty {
  justify-content: center;
  padding: 4rem 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.archives-page__sidebar {
  flex-shrink: 0;
  width: 280px;
  position: sticky;
  top: 5rem;
}

.archives-page__content {
  flex: 1;
  min-width: 0;
}

.archives__year {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 1.5rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.archives__empty {
  text-align: center;
  padding: 4rem 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

@media (max-width: 900px) {
  .archives-page {
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }

  .archives-page__sidebar {
    width: 100%;
    position: static;
  }

  .archives-page__content {
    width: 100%;
  }
}
</style>
