<template>
  <nav v-if="totalPages > 1" class="pagination">
    <button
      v-if="totalPages > maxVisible"
      class="pagination__item pagination__item--nav"
      :class="{ 'pagination__item--disabled': currentPage === 1 }"
      :disabled="currentPage === 1"
      @click="$emit('change', 1)"
    >
      <Icon name="mingcute:arrows-left-line" />
    </button>
    <button
      class="pagination__item pagination__item--nav"
      :class="{ 'pagination__item--disabled': currentPage === 1 }"
      :disabled="currentPage === 1"
      @click="$emit('change', currentPage - 1)"
    >
      <Icon name="mingcute:left-line" />
    </button>
    <button
      v-for="page in pages"
      :key="page"
      class="pagination__item pagination__item--page"
      :class="{ 'pagination__item--active': currentPage === page }"
      @click="$emit('change', page)"
    >
      {{ page }}
    </button>
    <button
      class="pagination__item pagination__item--nav"
      :class="{ 'pagination__item--disabled': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      <Icon name="mingcute:right-line" />
    </button>
    <button
      v-if="totalPages > maxVisible"
      class="pagination__item pagination__item--nav"
      :class="{ 'pagination__item--disabled': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
      @click="$emit('change', totalPages)"
    >
      <Icon name="mingcute:arrows-right-line" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  maxVisible?: number
}>()

defineEmits<{
  change: [page: number]
}>()

const maxVisible = computed(() => props.maxVisible ?? 7)

const pages = computed(() => findNeighbors(props.currentPage, props.totalPages, maxVisible.value))

function findNeighbors(target: number, total: number, max: number): number[] {
  const result: number[] = []
  const half = Math.floor(max / 2)

  if (total <= max) {
    for (let i = 1; i <= total; i++) result.push(i)
    return result
  }

  for (let i = target - half; i <= target + half; i++) {
    if (i >= 1 && i <= total) result.push(i)
  }

  while (result.length < max) {
    const first = result[0]
    const last = result[result.length - 1]
    if (first > 1) {
      result.unshift(first - 1)
    } else if (last < total) {
      result.push(last + 1)
    } else {
      break
    }
  }

  return result
}
</script>

<style scoped>
.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
}

.pagination__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.5rem;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;
}

.pagination__item:hover:not(.pagination__item--disabled):not(.pagination__item--active) {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-2);
}

.pagination__item--active {
  background-color: var(--vp-c-brand-2);
  color: var(--vp-c-bg);
  cursor: default;
}

.pagination__item--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.pagination__item--nav {
  padding: 0 0.375rem;
  min-width: 2.25rem;
}

.pagination__item--page {
  min-width: 2.25rem;
}

@media screen and (max-width: 768px) {
  .pagination {
    gap: 0.25rem;
  }

  .pagination__item {
    min-width: 2rem;
    height: 2rem;
    font-size: 0.8125rem;
  }

  .pagination__item--nav {
    min-width: 2rem;
    padding: 0 0.25rem;
  }

  .pagination__item--page {
    min-width: 2rem;
  }
}
</style>
