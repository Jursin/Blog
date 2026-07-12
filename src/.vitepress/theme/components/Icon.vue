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

const dimensions = computed(() => {
  if (!props.size) return {}
  const s = String(props.size).replace(/px/g, '\x00')
  const parts = s.split('x').map(p => p.trim().replace(/\x00/g, 'px'))
  const toSize = (v: string) => String(Number(v)) === v ? `${v}px` : v
  return {
    width: toSize(parts[0]),
    height: parts[1] ? toSize(parts[1]) : toSize(parts[0]),
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