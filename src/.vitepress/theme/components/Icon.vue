<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  size?: string | number
  color?: string
}>()

const iconName = computed(() => {
  return props.name.replace(/^iconify\s+/, '')
})

function parseSize(s: string | number): string {
  if (String(Number(s)) === String(s)) return `${s}px`
  return String(s)
}

const dimensions = computed(() => {
  if (!props.size) return {}
  const parts = String(props.size)
    .replaceAll('px', '[UNIT]')
    .split('x')
    .map(s => parseSize(s.replaceAll('[UNIT]', 'px').trim()))

  return {
    width: parts[0],
    height: parts[1] || parts[0],
  }
})
</script>

<template>
  <IconifyIcon
    :icon="iconName"
    :color="color"
    v-bind="dimensions"
    class="icon"
    inline
    aria-hidden="true"
  />
</template>

<style scoped>
.icon {
  display: inline-flex;
  vertical-align: -0.125em;
  margin: 0 0.15em;
}
</style>