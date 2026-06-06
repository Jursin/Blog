import { defineClientConfig } from 'vuepress/client'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import AsideNav from './theme/components/AsideNav.vue'
import GitHubCard from './theme/components/GitHubCard.vue'
import Skills from './theme/components/Skills.vue'
import PostsTop from './theme/components/PostsTop.vue'
import Games from './theme/components/Games.vue'
import Anime from './theme/components/Anime.vue'
import SongList from './theme/components/SongList.vue'

import './theme/styles/var.css'
import './theme/styles/posts-container.css'
import './theme/styles/nav.css'
import './theme/styles/doc.css'
import './theme/styles/friends.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Swiper', Swiper)
    app.component('AsideNav', AsideNav)
    app.component('GitHubCard', GitHubCard)
    app.component('Skills', Skills)
    app.component('Games', Games)
    app.component('Anime', Anime)
    app.component('SongList', SongList)
  },

  layouts: {
    Layout: h(Layout, null, {
      'doc-title-after': () => h(PageContextMenu),
      'aside-outline-after': () => h(AsideNav),
      'posts-top': () => h(PostsTop),
    }),
  },
})
