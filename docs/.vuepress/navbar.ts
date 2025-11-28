/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '主页', icon: 'mdi:home', link: 'https://www.jursin.top' },
  { text: '博客', icon: 'mdi:blog', link: '/blog/' },
  { text: '友链', icon: 'mdi:link', link: '/friends' },
])
