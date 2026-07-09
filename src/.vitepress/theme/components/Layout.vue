<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'
import Breadcrumb from "./Breadcrumb.vue";
import Copyright from './Copyright.vue'
import Comment from './Comment.vue'
import PrevNext from './PrevNext.vue'

const { Layout } = DefaultTheme
const { isDark, frontmatter } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
    <Layout>
      <template #doc-before>
        <Breadcrumb />
      </template>
      <template #doc-footer-before>
        <Copyright />
      </template>
      <template #doc-after>
        <PrevNext />
        <Comment v-if="frontmatter.comment !== false" />
      </template>
    </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* 修正因视图过渡导致的按钮图标偏移 */
.VPSwitchAppearance .check .icon {
  top: -2px;
}
</style>