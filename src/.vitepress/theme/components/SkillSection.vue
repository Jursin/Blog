<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  items: { name: string; icon?: string; custom?: boolean; svg?: string; color?: string }[]
}>()
</script>

<template>
  <h3 class="skill-header">
    <Icon :name="icon" color="var(--vp-c-brand-1)" />
    {{ title }}
  </h3>
  <div class="itemGrid">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="gridItem"
      :data-name="item.name"
    >
      <img v-if="item.custom" :src="item.svg" :alt="item.name" class="icon-img" />
      <Icon v-else :name="item.icon" size="2rem" :color="item.color || 'currentColor'" />
    </div>
  </div>
</template>

<style scoped>
.skill-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin: 1.5rem 0 1rem;
  font-size: 20px;
  font-weight: 600;
}

.itemGrid {
  display: flex;
  flex-wrap: wrap;
}

.gridItem {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  position: relative;
  margin: 0 0.2rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.gridItem::before {
  content: attr(data-name);
  position: absolute;
  top: -1.5rem;
  left: 50%;
  color: var(--vp-c-text-1);
  font-size: 14px;
  background: var(--vp-c-bg-soft);
  width: max-content;
  padding: 0 5px;
  text-align: center;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  transform: translate(-50%, 20px);
  opacity: 0;
}

.gridItem:hover::before {
  transform: translate(-50%, 0);
  opacity: 1;
}

.icon-img {
  width: 2rem;
  height: 2rem;
}
</style>
