import { defineClientConfig } from 'vuepress/client'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import AsideNav from './theme/components/AsideNav.vue'

import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // app.component('RepoCard', RepoCard)
    app.component('Swiper', Swiper)
    app.component('AsideNav', AsideNav)
  },

  layouts: {
    Layout: h(Layout, null, {
      'doc-title-after': () => h(PageContextMenu),
      'aside-outline-after': () => h(AsideNav),
    }),
  },
})
