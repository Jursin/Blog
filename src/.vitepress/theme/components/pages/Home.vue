<template>
  <div class="home-page" v-if="posts.length">
    <div class="home-page__sidebar">
      <HomeSidebar
        :totalPosts="posts.length"
        :runningDays="runningDays"
        :tabs="tabs"
        :postsByCategory="groupedPosts.category"
        :postsByTag="groupedPosts.tag"
        :selectedCategory="selectedCategory"
        :selectedTag="selectedTag"
        @update:selectedCategory="onCategoryChange"
        @update:selectedTag="onTagChange"
      />
    </div>
    <div class="home-page__content">
      <div v-if="selectedCategory || selectedTag" class="home-page__filter-hint">
        <span class="home-page__filter-label">
          {{ selectedCategory ? '分类' : '标签' }}：<strong>{{ filterDisplayName }}</strong>
        </span>
        <span class="home-page__filter-count">{{ filteredPosts.length }} 篇</span>
        <button class="home-page__filter-clear" @click="clearFilter">清除筛选</button>
      </div>
      <PostList
        :posts="pagePosts"
        :key="`${selectedCategory}-${selectedTag}-${currentPage}`"
        @selectCategory="onCategoryChange"
        @selectTag="onTagChange"
      />
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :maxVisible="site.pagination.maxVisible"
        @change="setPage"
      />
    </div>
  </div>
  <div v-else class="home-page home-page--empty">
    <p>暂无文章</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { inBrowser } from 'vitepress'
import { data as posts } from '../../posts.data'
import { useGroup } from '../../utils/group'
import { usePagination } from '../../composables/usePagination'
import site from '../../config'
import { countDaysFrom, getCategoryDisplay } from '../../utils/functions'
import HomeSidebar from '../HomeSidebar.vue'
import PostList from '../PostList.vue'
import Pagination from '../Pagination.vue'

const runningDays = countDaysFrom(site.blogStartDate)

const selectedCategory = ref('')
const selectedTag = ref('')

const { tabs, posts: groupedPosts } = useGroup(posts)

const filteredPosts = computed(() => {
  if (selectedCategory.value) {
    return groupedPosts.category[selectedCategory.value] || []
  }
  if (selectedTag.value) {
    return groupedPosts.tag[selectedTag.value] || []
  }
  return posts
})

const { currentPage, totalPages, pagePosts, setPage } = usePagination(filteredPosts, site.pagination.pageSize)

const filterDisplayName = computed(() => {
  if (selectedCategory.value) {
    return getCategoryDisplay(selectedCategory.value)
  }
  if (selectedTag.value) {
    return selectedTag.value
  }
  return ''
})

// 将当前筛选同步到 URL query params（不触发导航）
function syncUrl() {
  if (!inBrowser) return
  const url = new URL(window.location.href)
  url.searchParams.delete('category')
  url.searchParams.delete('tag')
  if (selectedCategory.value) {
    url.searchParams.set('category', selectedCategory.value)
  } else if (selectedTag.value) {
    url.searchParams.set('tag', selectedTag.value)
  }
  window.history.replaceState({}, '', url.toString())
}

const onCategoryChange = (cat: string) => {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat
  selectedTag.value = ''
  setPage(1)
  syncUrl()
}

const onTagChange = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? '' : tag
  selectedCategory.value = ''
  setPage(1)
  syncUrl()
}

const clearFilter = () => {
  selectedCategory.value = ''
  selectedTag.value = ''
  setPage(1)
  syncUrl()
}

// 从其他页面跳转过来时读取 URL 查询参数
onMounted(() => {
  if (!inBrowser) return
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('category')
  const tag = params.get('tag')
  if (cat) {
    selectedCategory.value = cat
  } else if (tag) {
    selectedTag.value = tag
  }
})
</script>

<style scoped>
.home-page {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  max-width: 1420px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.home-page--empty {
  justify-content: center;
  padding: 4rem 1.5rem;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.home-page__sidebar {
  flex-shrink: 0;
  width: 280px;
  position: sticky;
  top: 5rem;
}

.home-page__content {
  flex: 1;
  min-width: 0;
}

.home-page__filter-hint {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  font-size: 0.875rem;
}

.home-page__filter-label {
  color: var(--vp-c-text-2);
}

.home-page__filter-label strong {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.home-page__filter-count {
  color: var(--vp-c-text-3);
  font-size: 0.8125rem;
}

.home-page__filter-clear {
  margin-left: auto;
  padding: 0.25rem 0.625rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.home-page__filter-clear:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

@media (max-width: 900px) {
  .home-page {
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }

  .home-page__sidebar {
    width: 100%;
    position: static;
  }

  .home-page__content {
    width: 100%;
  }
}
</style>
