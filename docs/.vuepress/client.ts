import { defineClientConfig } from 'vuepress/client'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import AsideNav from './theme/components/AsideNav.vue'
import GitHubCard from './theme/components/GitHubCard.vue'
import ItemGrid from './theme/components/ItemGrid.vue'
import Douyin from './theme/components/Douyin.vue'

import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Swiper', Swiper)
    app.component('AsideNav', AsideNav)
    app.component('GitHubCard', GitHubCard)
    app.component('ItemGrid', ItemGrid)
    app.component('Douyin', Douyin)
  },

  layouts: {
    Layout: h(Layout, null, {
      'doc-title-after': () => h(PageContextMenu),
      'aside-outline-after': () => h(AsideNav),
    }),
  },
})
