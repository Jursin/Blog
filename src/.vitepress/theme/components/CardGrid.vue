<script setup lang="ts">
const props = defineProps<{
  cols?: string | number | { sm?: number, md?: number, lg?: number }
}>()

const colSet = (() => {
  const reset = { sm: 1, md: 2, lg: 2 }
  if (typeof props.cols === 'number' || typeof props.cols === 'string') {
    const res = Number(props.cols)
    return { sm: res, md: res, lg: res }
  }
  return { ...reset, ...props.cols }
})()
</script>

<template>
  <div
    class="card-grid"
    :style="{
      '--card-grid-sm': colSet.sm,
      '--card-grid-md': colSet.md,
      '--card-grid-lg': colSet.lg,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--card-grid-sm), 1fr);
  gap: 16px 20px;
  margin: 16px 0;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(var(--card-grid-md), 1fr);
  }
}

@media (min-width: 960px) {
  .card-grid {
    grid-template-columns: repeat(var(--card-grid-lg), 1fr);
  }
}

.card-grid > :deep(*) {
  min-width: 0;
  margin: 0 !important;
}
</style>
