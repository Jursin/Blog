<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const bodyHeight = ref(0)
const windowHeight = ref(0)
const scrolling = ref(false)
const isDesktop = ref(false)
let scrollTimer: ReturnType<typeof setTimeout> | null = null

const CIRCUMFERENCE_MOBILE = 2 * Math.PI * 16
const CIRCUMFERENCE_DESKTOP = 2 * Math.PI * 22

function updateDimensions() {
  bodyHeight.value = document.documentElement.scrollHeight
  windowHeight.value = window.innerHeight
}

function updateViewport() {
  isDesktop.value = window.innerWidth >= 768
}

function onScroll() {
  updateDimensions()
  scrollY.value = window.scrollY
  scrolling.value = true
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => { scrolling.value = false }, 1000)
}

function onResize() {
  updateDimensions()
  updateViewport()
}

const visible = computed(() => {
  if (bodyHeight.value <= windowHeight.value) return false
  return scrollY.value > windowHeight.value / 2
})

const progress = computed(() => {
  const max = bodyHeight.value - windowHeight.value
  if (max <= 0) return 0
  return Math.min((scrollY.value / max) * 100, 100)
})

const percent = computed(() => `${Math.round(progress.value)}%`)

const circumference = computed(() =>
  isDesktop.value ? CIRCUMFERENCE_DESKTOP : CIRCUMFERENCE_MOBILE,
)

const strokeDasharray = computed(() => {
  const c = circumference.value
  if (bodyHeight.value <= windowHeight.value) return `0 ${c}px`
  const done = (progress.value / 100) * c
  return `${done}px ${c}px`
})

const iconSize = computed(() => isDesktop.value ? 24 : 18)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateDimensions()
  updateViewport()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (scrollTimer) clearTimeout(scrollTimer)
})
</script>

<template>
  <Transition name="fade">
    <button
      v-show="visible"
      type="button"
      class="back-to-top"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <span class="percent" :class="{ show: scrolling }">{{ percent }}</span>
      <span class="icon-wrap" :class="{ show: !scrolling }">
        <Icon name="icon-park-outline:to-top" :size="iconSize" />
      </span>
      <svg class="ring" aria-hidden="true">
        <circle cx="50%" cy="50%" :style="{ strokeDasharray }" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 96px;
  z-index: 99;
  width: 36px;
  height: 36px;
  padding: 0;
  background-color: var(--vp-c-bg);
  border: none;
  border-radius: 50%;
  box-shadow: var(--vp-shadow-2);
  cursor: pointer;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.back-to-top:hover {
  background-color: var(--vp-c-bg-soft);
}

.percent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  font-size: 10px;
  color: var(--vp-c-text-2);
  user-select: none;
}

.percent.show {
  opacity: 1;
}

.icon-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  color: var(--vp-c-text-1);
}

.icon-wrap.show {
  opacity: 1;
}

.ring {
  width: 100%;
  height: 100%;
}

.ring circle {
  fill: none;
  r: 16px;
  stroke: var(--vp-c-brand-2);
  stroke-dasharray: 0 100.53px;
  stroke-width: 3px;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

@media (min-width: 768px) {
  .back-to-top {
    width: 48px;
    height: 48px;
    bottom: 73px;
    right: 32px;
  }

  .percent {
    font-size: 14px;
  }

  .ring circle {
    r: 22px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media print {
  .back-to-top {
    display: none;
  }
}
</style>
