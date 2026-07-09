import { ref, computed, watch, type Ref } from 'vue'
import type { Post } from '../posts.data'

export function usePagination(posts: Ref<Post[]>, pageSize: number) {
  const currentPage = ref(1)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(posts.value.length / pageSize))
  )

  const pagePosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return posts.value.slice(start, start + pageSize)
  })

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  // 当数据源变化时自动回退到首页
  watch(() => posts.value.length, () => {
    const maxPage = Math.max(1, Math.ceil(posts.value.length / pageSize))
    if (currentPage.value > maxPage) {
      currentPage.value = 1
    }
  })

  return { currentPage, totalPages, pagePosts, setPage }
}
