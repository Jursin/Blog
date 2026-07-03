<template>
  <span class="meta-item pageview-wrapper">
    <Icon name="mdi-light:eye" />
    <span
      class="waline-pageview-count"
      :data-path="route.path"
    />
  </span>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.pageview-wrapper {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.waline-pageview-count:empty::before {
  content: '加载中';
  color: var(--vp-c-text-3);
}
</style>