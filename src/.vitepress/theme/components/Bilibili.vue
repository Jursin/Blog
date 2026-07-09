<script setup lang="ts">
import { computed } from 'vue'

const BILIBILI_LINK = 'https://player.bilibili.com/player.html'

const props = defineProps<{
  bvid?: string
  aid?: string
  cid?: string
  page?: number
  autoplay?: boolean
  time?: string | number
  width?: string
  height?: string
  ratio?: string
  title?: string
}>()

function parseTime(t: string | number): number {
  if (typeof t === 'number') return t
  const parts = t.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return Number(t) || 0
}

function parseRatio(r?: string): number {
  if (!r) return 16 / 9
  const [w, h] = r.split(':').map(Number)
  return w / h
}

const heightStyle = computed(() => {
  if (props.height) return props.height
  if (!props.width || props.width === '100%') return undefined
  const w = parseFloat(props.width)
  if (isNaN(w)) return undefined
  return `${Math.round(w / parseRatio(props.ratio))}px`
})

const src = computed(() => {
  const params = new URLSearchParams()
  if (props.bvid) params.set('bvid', props.bvid)
  if (props.aid) params.set('aid', props.aid)
  if (props.cid) params.set('cid', props.cid)
  if (props.page) params.set('p', String(props.page))
  if (props.time) params.set('t', String(parseTime(props.time)))
  params.set('autoplay', props.autoplay ? '1' : '0')
  params.set('high_quality', '1')
  return `${BILIBILI_LINK}?${params.toString()}`
})
</script>

<template>
  <ClientOnly>
    <iframe
      class="bilibili-iframe"
      :src="src"
      :title="title || 'Bilibili'"
      :style="{
        width: width || '100%',
        height: heightStyle || 'auto',
        aspectRatio: heightStyle ? undefined : ratio?.replace(':', ' / ') || '16 / 9',
      }"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </ClientOnly>
</template>

<style scoped>
.bilibili-iframe {
  display: block;
  margin: 16px auto;
  border: none;
  border-radius: 8px;
  max-width: 100%;
}
</style>