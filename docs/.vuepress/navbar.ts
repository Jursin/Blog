/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '主页', icon: 'mdi:home', link: '/' },
  { text: '博客', icon: 'mdi:blog', link: '/blog/' },
  { text: '技术', icon: 'mdi:code-tags', link: '/tech' },
  { text: '友链', icon: 'mdi:link', link: '/friends' },
  {
    text: '我的网站',
    icon: 'streamline-plump:web',
    items: [
      { text: 'MC 指南', link: 'https://mc-guide.jursin.top/' },
      { text: 'Openlist', link: 'https://openlist.jursin.top/' },
    ]
  },
])
