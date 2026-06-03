import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '主页', icon: 'octicon:home-16', link: '/' },
  { text: '技能', icon: 'octicon:ai-model-16', link: '/skills' },
  {
    text: '娱乐',
    icon: 'material-symbols:interests-outline',
    items: [
      {
        text: '游戏',
        icon: 'mingcute:game-2-line',
        link: '/games',
      },
      {
        text: '追番',
        icon: 'mdi:film-outline',
        link: '/anime',
      },{
        text: '歌单',
        icon: 'mdi:music',
        link: '/song-list',
      },
    ],
  },
  { text: '友链', icon: 'octicon:link-16', link: '/friends' },
  {
    text: '网站',
    icon: 'octicon:browser-16',
    items: [
      {
        text: '站点监测',
        icon: 'carbon:circle-filled',
        link: 'https://status.jursin.top/'
      },
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
