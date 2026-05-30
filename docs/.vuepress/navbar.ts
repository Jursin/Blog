/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '主页', icon: 'octicon:home-16', link: '/' },
  { text: '技能', icon: 'octicon:ai-model-16', link: '/skills' },
  { text: '友链', icon: 'octicon:link-16', link: '/friends' },
  {
    text: '网站',
    icon: 'octicon:browser-16',
    items: [
      {
        text: 'Openlist',
        icon: '/icon/openlist.svg',
        link: 'https://openlist.jursin.top/'
      },
      {
        text: 'MC-Guide',
        icon: '/icon/mc-guide.svg',
        link: 'https://mc-guide.jursin.top/'
      },
      {
        text: '拾光课程表',
        icon: '/icon/shiguangschedule.svg',
        link: 'https://sgschedule.jursin.top/'
      }
    ]
  },
])
