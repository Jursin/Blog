import type { EnhanceAppContext, Theme } from 'vitepress'
import { inBrowser } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { onMounted, onUnmounted } from 'vue';
import 'iconify-icon'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import { bindFancybox, destroyFancybox } from './utils/fancybox';
import { useMark } from './composables/useMark';
import { useOutlineScroll } from './composables/useOutlineScroll';
import { useActiveHeaderLinks } from './composables/useActiveHeaderLinks';
import Layout from './components/Layout.vue'
import ArticleMeta from "./components/ArticleMeta.vue"
import Icon from './components/Icon.vue'
import GitHubCard from './components/GitHubCard.vue'
import CardGrid from './components/CardGrid.vue'
import Bilibili from './components/Bilibili.vue'
import Home from './components/pages/Home.vue'
import Archives from './components/pages/Archives.vue'
import Skills from './components/pages/Skills.vue'
import Games from './components/pages/Games.vue'
import Anime from './components/pages/Anime.vue'
import SongList from './components/pages/SongList.vue'
import Friends from './components/pages/Friends.vue'
import './styles/var.css'
import './styles/container.css'
import './styles/readmore.css'
import './styles/fancybox.css'
import './styles/nav.css'
import './styles/mark.css'
import './styles/plot.css'
import './styles/code.css'
import './styles/task-list.css'
import './styles/text-image.css'
import 'virtual:group-icons.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

let mark: ReturnType<typeof useMark> | undefined
let outlineScroll: ReturnType<typeof useOutlineScroll> | undefined
let activeHeaderLinks: ReturnType<typeof useActiveHeaderLinks> | undefined

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('ArticleMeta' , ArticleMeta)
    app.component('Icon' , Icon)
    app.component('Bilibili' , Bilibili)
    app.component('GitHubCard' , GitHubCard)
    app.component('CardGrid' , CardGrid)
    app.component('Home', Home)
    app.component('Archives', Archives)
    app.component('Skills', Skills)
    app.component('Games', Games)
    app.component('Anime', Anime)
    app.component('SongList', SongList)
    app.component('Friends', Friends)
    app.use(NolebaseGitChangelogPlugin)
    if (inBrowser) {
      router.onBeforeRouteChange = () => {
        destroyFancybox().catch(() => {});
      };
      router.onAfterRouteChange = () => {
        mark?.reset();
        outlineScroll?.restart();
        bindFancybox().catch(() => {});
      };
    }
  },
  setup() {
    onMounted(() => {
      mark = useMark();
      mark?.bind();
      outlineScroll = useOutlineScroll();
      activeHeaderLinks = useActiveHeaderLinks();
      bindFancybox().catch(() => {});
    });
    onUnmounted(() => {
      destroyFancybox().catch(() => {});
      mark?.destroy();
      outlineScroll?.destroy();
      activeHeaderLinks?.destroy();
    });
  }
} satisfies Theme
